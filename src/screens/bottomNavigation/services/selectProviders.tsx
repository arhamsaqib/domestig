import React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../../../common/styles';
import {BackIcon} from '../../../components/backIcon';
import {MyButton} from '../../../components/button';
import {PageNameText} from '../../../components/texts/pageNameText';
import {ProviderCard} from './components/providerCard';

export const SelectProviders = ({navigation}: any) => {
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
        <ProviderCard />
        <ProviderCard />
        <ProviderCard />
        <ProviderCard />
        <ProviderCard />
        <ProviderCard />
        <ProviderCard />
        <ProviderCard />
      </View>
      <View style={styles.btnRow}>
        <View style={{width: '45%'}}>
          <MyButton secondary title="Back" />
        </View>
        <View style={{width: '45%'}}>
          <MyButton
            title="Next"
            onPress={() => navigation.navigate('confirmBooking')}
          />
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
