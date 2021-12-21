import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Divider} from '../../../../../components/divider';
import {FONTS} from '../../../../../constants/fonts';
import {ICONS} from '../../../../../constants/icons';
import {ScrollableView} from '../../../../../helpers/scrollableView';

interface Props {
  available?: boolean;
  used?: boolean;
}

const Transaction = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>
      <View
        style={{
          width: '30%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 35,
        }}>
        <Text style={styles.val}>{'234234'}</Text>
      </View>
      <View
        style={{
          width: '30%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 35,
        }}>
        <Text style={styles.val}>{'$5680'}</Text>
      </View>
      <View
        style={{
          width: '40%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 35,
        }}>
        <Text style={styles.val}>{'August 05, 2021'}</Text>
      </View>
    </View>
  );
};

export const TransactionsCard = (props: Props) => {
  return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>
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
      <ScrollableView>
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
        <Transaction />
      </ScrollableView>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    //width:160,
    maxHeight: 409,
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
