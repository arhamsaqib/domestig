import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native';
import {MyButton} from '../../../../../components/button';
import {Divider} from '../../../../../components/divider';
import {FONTS} from '../../../../../constants/fonts';
import {ICONS} from '../../../../../constants/icons';
import {ConvertDateToObject} from '../../../../../helpers/convertDateTobject';
import {ScrollableView} from '../../../../../helpers/scrollableView';

interface Props {
  available?: boolean;
  used?: boolean;
  data?: any;
  headerComp?: any;
}

export const Transaction = (props: {data?: any}) => {
  const {data} = props;
  const extra = parseFloat(data.extra_work_charges);
  const amount = parseFloat(data.amount);
  const total = parseFloat(data.total_amount);
  const date = ConvertDateToObject(data.created_at);
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>
      <View
        style={{
          width: '30%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 35,
        }}>
        <Text style={styles.val}>{data.id}</Text>
      </View>
      <View
        style={{
          width: '30%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 35,
        }}>
        <Text style={styles.val}>
          {'$'}
          {amount + (extra ? extra : 0)}
        </Text>
      </View>
      <View
        style={{
          width: '40%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 35,
        }}>
        <Text style={styles.val}>
          {date.month + ' ' + date.date + ', ' + date.year}
        </Text>
      </View>
    </View>
  );
};

export const TransactionsCard = (props: Props) => {
  function renderTransaction({item}: any) {
    return <Transaction data={item} />;
  }

  return (
    <>
      <View style={styles.main}>
        <View
          style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>
          <View
            style={{
              width: '30%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 35,
            }}>
            <Text style={styles.head}>ID</Text>
          </View>
          <View
            style={{
              width: '30%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 35,
            }}>
            <Text style={styles.head}>Amount</Text>
          </View>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 35,
            }}>
            <Text style={styles.head}>Date</Text>
          </View>
        </View>
        <Divider />
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            //  borderWidth: 1,
          }}>
          <FlatList
            data={props.data}
            showsVerticalScrollIndicator
            renderItem={renderTransaction}
            style={{height: '80%'}}
            inverted
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    //width:160,
    height: 409,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    //borderWidth: 1,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 3,
  },
  val: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 13,
    color: '#666666',
  },
  head: {
    fontFamily: FONTS.P_MEDIUM,
    fontSize: 15,
    color: '#222222',
  },
  imegCont: {
    height: 52,
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: '#f1f7ec',
  },
  wallet: {
    width: 34.63,
    height: 35.75,
  },
  cash: {
    width: 35.75,
    height: 34.56,
  },
});
