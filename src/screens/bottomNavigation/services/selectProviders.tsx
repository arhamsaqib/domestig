import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getCustomerById} from '../../../api/customer';
import {showAllProviders, showProvidersByLocation} from '../../../api/provider';
import {CommonStyles} from '../../../common/styles';
import {BackIcon} from '../../../components/backIcon';
import {MyButton} from '../../../components/button';
import {FieldNameText} from '../../../components/texts/fieldNameText';
import {PageNameText} from '../../../components/texts/pageNameText';
import {COLORS} from '../../../constants/colors';
import {arrayOfObjectsSearchWithId} from '../../../helpers/arrayOfObjectsSearch';
import {extractKeys} from '../../../helpers/extractKeys';
import {removeItemOnce} from '../../../helpers/removeItemFromArray';
import {ProviderCard} from './components/providerCard';

export const SelectProviders = ({navigation, route}: any) => {
  const [providers, setProviders]: any = useState([]);
  const [loader, setLoader]: any = useState(false);
  const [selected, setSelected]: any = useState([]);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  async function getData() {
    setLoader(true);
    const cus = await getCustomerById(state.id);
    //console.log(route.params, 'customer');
    const ser = extractKeys(route.params.services);
    console.log(ser, 'services');
    if (cus.id !== undefined) {
      const data = {
        lat: cus.latitude,
        lng: cus.longitude,
        services: ser,
        category: route.params.categoryName,
      };
      const res = await showProvidersByLocation(data).finally(() =>
        setLoader(false),
      );
      if (res !== undefined) {
        setProviders(res);
      }
    }
  }
  useEffect(() => {
    getData();
  }, []);
  function onProviderPress(item: any) {
    if (arrayOfObjectsSearchWithId(item.id, selected)) {
      var res = removeItemOnce(item, selected);
      setSelected(res);
    } else {
      setSelected([...selected, item]);
    }
  }
  function onNextPress() {
    navigation.navigate('confirmBooking', {
      services: route.params.services,
      providers: selected,
      categoryName: route.params.categoryName,
      schedule: route.params.schedule,
    });
  }
  const renderProviders = ({item}: any) => {
    return (
      <ProviderCard
        name={item.name}
        data={item}
        onPress={() => onProviderPress(item)}
      />
    );
  };
  function disabled() {
    return providers.length < 1 || selected.length < 1;
  }
  return (
    <SafeAreaView style={CommonStyles.screenMain}>
      <View style={styles.topRow}>
        <View style={{width: '15%', alignItems: 'flex-start'}}>
          <BackIcon black onPress={() => navigation.goBack()} />
        </View>
        <View style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
          <PageNameText>Select Providers</PageNameText>
        </View>
      </View>
      <View style={{width: '90%', marginTop: 10}}>
        {loader && <ActivityIndicator color={COLORS.MAIN_1} size="small" />}
        {providers.length < 1 && (
          <FieldNameText>
            No providers found for selected services
          </FieldNameText>
        )}
        <FlatList renderItem={renderProviders} data={providers} />
      </View>
      <View style={styles.btnRow}>
        <View style={{width: '45%'}}>
          <MyButton
            secondary
            title="Back"
            onPress={() => navigation.goBack()}
          />
        </View>
        <View style={{width: '45%'}}>
          <MyButton title="Next" onPress={onNextPress} disabled={disabled()} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
    marginBottom: 20,
  },
  btnRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});
