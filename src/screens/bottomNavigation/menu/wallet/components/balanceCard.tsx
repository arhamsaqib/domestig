import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../../../../../constants/fonts';
import {ICONS} from '../../../../../constants/icons';

interface Props {
  available?: boolean;
  used?: boolean;
}

export const BalanceCard = (props: Props) => {
  return (
    <View style={styles.main}>
      <View
        style={{
          width: '80%',
          height: '80%',
          alignItems: 'flex-start',
          justifyContent: 'center',
        }}>
        {props.available && (
          <Image source={ICONS.wallet_cash} style={[styles.wallet]} />
        )}
        {props.used && (
          <Image source={ICONS.cash_coins} style={[styles.cash]} />
        )}
        <View style={{marginTop: 5}} />
        <Text style={[styles.title, {marginBottom: 5}]}>
          {props.available && 'Available'}
          {props.used && 'Used'} balance
        </Text>
        <Text style={styles.balance}>$5055.00</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    //width:160,
    height: 157,
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
  title: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 12,
    color: '#666666',
  },
  balance: {
    fontFamily: FONTS.P_BOLD,
    fontSize: 20,
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
