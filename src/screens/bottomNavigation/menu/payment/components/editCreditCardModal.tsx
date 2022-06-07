import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BottomCard} from '../../../../../components/bottomCard';
import {GreenCircle} from '../../../../../components/greenCircle';
import {MyTextInput} from '../../../../../components/textinput';
import {COLORS} from '../../../../../constants/colors';
import {FONTS} from '../../../../../constants/fonts';
import {ICONS} from '../../../../../constants/icons';
import {MyButton} from '../../../../../components/button';

interface Props {
  modalVisibility: boolean;
  onOutsidePress?(): void;
  onSubmit?(data: any): void;
  loading?: boolean;
}

export const EditCreditCardModal = (props: Props) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [monthYear, setMonthYear] = useState('');
  const [cvc, setCvc] = useState('');

  function disabled() {
    return (
      name.length < 2 ||
      cvc.length < 3 ||
      number.length < 10 ||
      monthYear.length < 4
    );
  }

  function onSubmit() {
    const month = monthYear[0] + monthYear[1];
    const year = monthYear[3] + monthYear[4];
    const data = {
      number: number,
      expiryMonth: month,
      expiryYear: year,
      cvc: cvc,
      name: name,
    };
    props.onSubmit && props.onSubmit(data);
  }

  function onExpChange(val: string) {
    setMonthYear(val);
    if (val.length === 2 && val.length > monthYear.length) {
      setMonthYear(val + '/');
    }
  }

  return (
    <BottomCard
      modalVisibility={props.modalVisibility}
      style={{height: 450}}
      onArrowPress={props.onOutsidePress}
      onOutsidePress={props.onOutsidePress}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <GreenCircle>
          <Image source={ICONS.card} style={styles.icon} />
        </GreenCircle>
        <Text
          style={[
            styles.title,
            {marginTop: 5, textAlign: 'center', width: '85%'},
          ]}>
          Enter the details and save your card for later use
        </Text>
      </View>

      <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
        <Text style={[styles.field, {marginBottom: 5}]}>Name on the card</Text>
        <MyTextInput onChangeText={setName} value={name} />
      </View>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Text style={[styles.field, {marginBottom: 5}]}>Card Number</Text>
        <MyTextInput onChangeText={setNumber} value={number} maxLength={16} />
      </View>
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
            onChangeText={onExpChange}
            maxLength={5}
            value={monthYear}
          />
        </View>
        <View style={{width: '48%', alignSelf: 'center'}}>
          <Text style={[styles.field, {marginBottom: 5}]}>CVC</Text>
          <MyTextInput onChangeText={setCvc} value={cvc} maxLength={3} />
        </View>
      </View>
      <View style={{width: '90%', alignSelf: 'center', marginVertical: 20}}>
        <MyButton
          title="Save Now"
          disabled={disabled()}
          onPress={onSubmit || props.loading}
          loading={props.loading}
        />
      </View>
    </BottomCard>
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
