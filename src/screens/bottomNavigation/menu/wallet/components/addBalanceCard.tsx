import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BottomCard} from '../../../../../components/bottomCard';
import {GreenCircle} from '../../../../../components/greenCircle';
import {MyTextInput} from '../../../../../components/textinput';
import {MyTextInputWithIcon} from '../../../../../components/textinputwithicon';
import {COLORS} from '../../../../../constants/colors';
import {FONTS} from '../../../../../constants/fonts';
import {ICONS} from '../../../../../constants/icons';
import Icon from 'react-native-vector-icons/Ionicons';
import {MyButton} from '../../../../../components/button';

interface Props {
  modalVisibility: boolean;
  onOutsidePress?(): void;
}

export const AddBalanceCard = (props: Props) => {
  return (
    <BottomCard
      modalVisibility={props.modalVisibility}
      style={{height: 609}}
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
        <MyTextInput />
      </View>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Text style={[styles.field, {marginBottom: 5}]}>Name on the card</Text>
        <MyTextInput />
      </View>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Text style={[styles.field, {marginBottom: 5}]}>Card Number</Text>
        <MyTextInput />
      </View>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
        <MyTextInput />
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
          <MyTextInput />
        </View>
        <View style={{width: '48%', alignSelf: 'center'}}>
          <Text style={[styles.field, {marginBottom: 5}]}>CVC</Text>
          <MyTextInput />
        </View>
      </View>
      <View style={{width: '90%', alignSelf: 'center', marginVertical: 20}}>
        <MyButton title="Add Now" />
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
