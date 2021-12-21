import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {CommonStyles} from '../../../common/styles';
import {BackIcon} from '../../../components/backIcon';
import {CheckMark} from '../../../components/checkmark';
import {PageNameText} from '../../../components/texts/pageNameText';
import {CategoryCard} from '../menu/components/categoryCard';

export const ServicesMain = ({navigation}: any) => {
  const data = [
    {name: 'Cat-1'},
    {name: 'Cat-2'},
    {name: 'Cat-3'},
    {name: 'Cat-4'},
    {name: 'Cat-5'},
    {name: 'Cat-6'},
    {name: 'Cat-7'},
    {name: 'Cat-8'},
    {name: 'Cat-9'},
    {name: 'Cat-10'},
    {name: 'Cat-11'},
    {name: 'Cat-12'},
    {name: 'Cat-13'},
  ];
  const renderServices = ({item}: any) => {
    return (
      <CategoryCard
        name={item.name}
        style={{width: '25%'}}
        onPress={() => navigation.navigate('servicesSub')}
      />
    );
  };
  return (
    <SafeAreaView style={CommonStyles.screenMain}>
      <View style={styles.topRow}>
        <View style={{width: '15%', alignItems: 'flex-start'}}>
          <BackIcon black onPress={() => navigation.goBack()} />
        </View>
        <View style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
          <PageNameText>Services Category</PageNameText>
        </View>
      </View>
      <View style={{width: '90%', marginVertical: 10}}>
        <FlatList numColumns={4} renderItem={renderServices} data={data} />
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
});
