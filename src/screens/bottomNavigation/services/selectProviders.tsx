import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {showAllProviders} from '../../../api/provider';
import {CommonStyles} from '../../../common/styles';
import {BackIcon} from '../../../components/backIcon';
import {MyButton} from '../../../components/button';
import {PageNameText} from '../../../components/texts/pageNameText';
import {COLORS} from '../../../constants/colors';
import {arrayOfObjectsSearchWithId} from '../../../helpers/arrayOfObjectsSearch';
import {removeItemOnce} from '../../../helpers/removeItemFromArray';
import {ProviderCard} from './components/providerCard';

export const SelectProviders = ({navigation, route}: any) => {
  const [providers, setProviders]: any = useState([]);
  const [loader, setLoader]: any = useState(false);
  const [selected, setSelected]: any = useState([]);
  async function getData() {
    setLoader(true);
    const res = await showAllProviders().finally(() => setLoader(false));
    if (res !== undefined) {
      setProviders(res);
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
    });
  }
  const renderProviders = ({item}: any) => {
    return (
      <ProviderCard name={item.name} onPress={() => onProviderPress(item)} />
    );
  };
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
        <FlatList renderItem={renderProviders} data={providers} />
      </View>
      <View style={styles.btnRow}>
        <View style={{width: '45%'}}>
          <MyButton secondary title="Back" />
        </View>
        <View style={{width: '45%'}}>
          <MyButton title="Next" onPress={onNextPress} />
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
