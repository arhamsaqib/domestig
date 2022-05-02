import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {BackIcon} from '../../../../components/backIcon';
import {MyButton} from '../../../../components/button';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {BalanceCard} from './components/balanceCard';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../../../constants/fonts';
import {COLORS} from '../../../../constants/colors';
import {TransactionsCard} from './components/transactionsCard';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {AddBalanceCard} from './components/addBalanceCard';
import {RootStateOrAny, useSelector} from 'react-redux';
import {findInvoices} from '../../../../api/invoice';

export const Wallet = ({navigation}: any) => {
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData]: any = useState([]);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  async function getData() {
    setLoader(true);
    const data = {
      customer_id: state.id,
    };
    const res = await findInvoices(data).finally(() => setLoader(false));
    if (res !== undefined) {
      setData(res);
    }
    console.log(res, 'invoices');
  }

  useEffect(() => {
    getData();
  }, []);

  var total = 0;
  var total1 = 0;
  data.forEach((item: any) => {
    total += parseFloat(item.amount);
  });
  data.forEach((item: any) => {
    total1 += item.extra_work_charges ? parseFloat(item.extra_work_charges) : 0;
  });

  return (
    <SafeAreaView style={CommonStyles.screenMain}>
      <AddBalanceCard
        modalVisibility={show}
        onOutsidePress={() => setShow(false)}
      />
      {/* <View style={{width: '100%', alignItems: 'center'}}> */}
      <ScrollableView>
        <View style={styles.topRow}>
          <View style={{width: '15%', alignItems: 'flex-start'}}>
            <BackIcon black onPress={() => navigation.goBack()} />
          </View>
          <View
            style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
            <PageNameText>Wallet</PageNameText>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{width: '48%'}}>
            <BalanceCard available amount={total + total1} />
          </View>
          <View style={{width: '48%'}}>
            <BalanceCard used amount={'0'} />
          </View>
        </View>
        <View style={[styles.row, {marginVertical: 20}]}>
          <Text style={styles.name}>All Reviews</Text>
          <Icon name="filter-outline" size={15} onPress={() => {}} />
        </View>
        <View style={{width: '90%'}}>
          <TransactionsCard data={data} />
        </View>
        <View style={styles.bottom}>
          <MyButton title="Add balance" onPress={() => setShow(true)} />
        </View>
        {/* </View> */}
      </ScrollableView>
    </SafeAreaView>
    // <FlatList
    //   ListHeaderComponent={headerComp}
    //   data={data}
    //   renderItem={renderTransaction}
    // />
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
  bottom: {
    // position: 'absolute',
    width: '90%',
    //bottom: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
});
