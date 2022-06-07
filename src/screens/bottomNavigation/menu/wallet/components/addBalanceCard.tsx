import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BottomCard} from '../../../../../components/bottomCard';
import {GreenCircle} from '../../../../../components/greenCircle';
import {MyTextInput} from '../../../../../components/textinput';
import {COLORS} from '../../../../../constants/colors';
import {FONTS} from '../../../../../constants/fonts';
import {ICONS} from '../../../../../constants/icons';
import {MyButton} from '../../../../../components/button';
import Toast from 'react-native-toast-message';

interface Props {
  modalVisibility: boolean;
  onOutsidePress?(): void;
  loading?: boolean;
  onSubmit?(obj: any): void;
}

export const AddBalanceCard = (props: Props) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [monthYear, setMonthYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [amount, setAmount] = useState('');

  function disabled() {
    return (
      name.length < 2 ||
      cvc.length < 3 ||
      number.length < 10 ||
      monthYear.length < 4
    );
  }

  function onSubmit() {
    const amt = parseFloat(amount);
    if (amt < 0.5) {
      Toast.show({
        type: 'error',
        text1: 'Amount',
        text2: 'Please enter a valid amount',
      });
    } else {
      const month = monthYear[0] + monthYear[1];
      const year = monthYear[3] + monthYear[4];
      const data = {
        number: number,
        expiryMonth: month,
        expiryYear: year,
        cvc: cvc,
        name: name,
        amount: amount,
      };
      props.onSubmit && props.onSubmit(data);
    }
  }

  function onExpChange(val: string) {
    setMonthYear(val);
    if (val.length === 2 && val.length > monthYear.length) {
      setMonthYear(val + '/');
    }
  }
  return (
    <>
      <BottomCard
        modalVisibility={props.modalVisibility}
        style={{height: 609}}
        onArrowPress={props.onOutsidePress}
        onOutsidePress={props.onOutsidePress}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <GreenCircle>
            <Image source={ICONS.card} style={styles.icon} />
          </GreenCircle>
          <Text
            style={[
              styles.title,
              {marginTop: 5, textAlign: 'center', width: '80%'},
            ]}>
            Enter the amount and card details to add balance in your wallet
          </Text>
        </View>
        <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Enter Amount</Text>
          <MyTextInput
            onChangeText={setAmount}
            value={amount}
            keyboardType="number-pad"
          />
        </View>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <Text style={[styles.field, {marginBottom: 5}]}>
            Name on the card
          </Text>
          <MyTextInput value={name} onChangeText={setName} />
        </View>
        <View style={{width: '90%', alignSelf: 'center'}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Card Number</Text>
          <MyTextInput
            onChangeText={setNumber}
            value={number}
            keyboardType="number-pad"
            maxLength={16}
          />
        </View>
        {/* <View style={{width: '90%', alignSelf: 'center'}}>
        <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
        <MyTextInput />
      </View> */}
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            alignSelf: 'center',
          }}>
          <View style={{width: '48%', alignSelf: 'center'}}>
            <Text style={[styles.field, {marginBottom: 5}]}>MM/YY</Text>
            <MyTextInput
              value={monthYear}
              onChangeText={onExpChange}
              keyboardType="number-pad"
              maxLength={5}
            />
          </View>
          <View style={{width: '48%', alignSelf: 'center'}}>
            <Text style={[styles.field, {marginBottom: 5}]}>CVC</Text>
            <MyTextInput
              value={cvc}
              onChangeText={setCvc}
              keyboardType="number-pad"
              maxLength={3}
            />
          </View>
        </View>
        <View style={{width: '90%', alignSelf: 'center', marginVertical: 20}}>
          <MyButton
            title="Add Now"
            disabled={disabled() || props.loading}
            onPress={onSubmit}
            loading={props.loading}
          />
        </View>
      </BottomCard>
      <Toast position="top" />
    </>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 20.73,
    width: 25.61,
  },
  title: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 13,
    color: COLORS.WF_TITLE,
  },
  field: {
    fontFamily: FONTS.P_Light,
    fontSize: 14,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },
});
