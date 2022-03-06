import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../../../common/styles';
import {BackIcon} from '../../../components/backIcon';
import {MyButton} from '../../../components/button';
import {PageNameText} from '../../../components/texts/pageNameText';
import {arrayOfObjectsSearchWithId} from '../../../helpers/arrayOfObjectsSearch';
import {removeItemOnce} from '../../../helpers/removeItemFromArray';
import {ProviderCard} from './components/providerCard';
import {SubcategoryCard} from './components/subcategoryCard';

export const ServicesSubcategory = ({navigation, route}: any) => {
  const [selected, setSelected]: any = useState([]);
  function onServicePress(item: any) {
    console.log(item, 'item');
    if (arrayOfObjectsSearchWithId(item.id, selected)) {
      var res = removeItemOnce(item, selected);
      setSelected(res);
    } else {
      setSelected([...selected, item]);
    }
  }
  useEffect(() => {
    console.log(route.params.service);
  }, []);
  const renderServices = ({item}: any) => {
    return (
      <SubcategoryCard name={item.name} onPress={() => onServicePress(item)} />
    );
  };
  function onNextPress() {
    navigation.navigate('selectProviders', {
      services: selected,
      categoryName: route.params.categoryName,
    });
  }
  return (
    <SafeAreaView style={CommonStyles.screenMain}>
      <View style={styles.topRow}>
        <View style={{width: '15%', alignItems: 'flex-start'}}>
          <BackIcon black onPress={() => navigation.goBack()} />
        </View>
        <View style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
          <PageNameText>Select your services</PageNameText>
        </View>
      </View>
      <View style={{width: '90%', marginTop: 10}}>
        <FlatList
          renderItem={renderServices}
          data={route.params.service.services}
        />
      </View>

      <View style={styles.btnRow}>
        <View style={{width: '45%'}}>
          <MyButton secondary title="Schedule" />
        </View>
        <View style={{width: '45%'}}>
          <MyButton title="Book now" onPress={onNextPress} />
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
