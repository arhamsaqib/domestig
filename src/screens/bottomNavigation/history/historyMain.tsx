import React from 'react';
import {FlatList, SafeAreaView, StyleSheet, View} from 'react-native';
import {CommonStyles} from '../../../common/styles';
import {PageNameText} from '../../../components/texts/pageNameText';
import {ToggleButton} from '../../../components/toggleButton';
import {HistoryCard} from './components/historyCard';

export const HistoryMain = ({navigation}: any) => {
  return (
    <SafeAreaView style={CommonStyles.screenMain}>
      <View style={{width: '90%', marginVertical: 10}}>
        <PageNameText>Booking History</PageNameText>
      </View>
      <View style={styles.filterCont}>
        <View style={{width: '30%'}}>
          <ToggleButton name="Current" activeByDefault />
        </View>
        <View style={{width: '30%'}}>
          <ToggleButton name="Past" />
        </View>
        <View style={{width: '30%'}}>
          <ToggleButton name="Up-coming" />
        </View>
      </View>
      <View style={{width: '90%', marginVertical: 10}}>
        <HistoryCard onPress={() => navigation.navigate('historyDetails')} />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  filterCont: {
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
