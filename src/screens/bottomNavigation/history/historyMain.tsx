import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import {showAllCustomerBookings} from '../../../api/bookings';
import {CommonStyles} from '../../../common/styles';
import {PageNameText} from '../../../components/texts/pageNameText';
import {ToggleButton} from '../../../components/toggleButton';
import {COLORS} from '../../../constants/colors';
import {extractKeys, joinArrayKeys} from '../../../helpers/extractKeys';
import {HistoryCard} from './components/historyCard';

export const HistoryMain = ({navigation}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  const [history, setHistory]: any = useState([]);
  const [loader, setLoader]: any = useState(false);
  async function getData() {
    setLoader(true);
    const res = await showAllCustomerBookings(state.id).finally(() =>
      setLoader(false),
    );
    if (res !== undefined) {
      setHistory(res);
    }
    console.log(res, 'history response');
  }
  const renderHistory = ({item}: any) => {
    return <HistoryCard status={item.status} />;
  };
  useEffect(() => {
    getData();
  }, []);
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
        {loader && <ActivityIndicator color={COLORS.MAIN_1} size="small" />}

        <FlatList
          refreshControl={
            <RefreshControl onRefresh={getData} refreshing={false} />
          }
          renderItem={renderHistory}
          data={history}
        />

        {/* <HistoryCard onPress={() => navigation.navigate('historyDetails')} />
        <HistoryCard />
        <HistoryCard />
        <HistoryCard /> */}
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
