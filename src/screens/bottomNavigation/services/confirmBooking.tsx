import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../../../common/styles';
import {BackIcon} from '../../../components/backIcon';
import {MyButton} from '../../../components/button';
import {CheckMark} from '../../../components/checkmark';
import {MyTextInput} from '../../../components/textinput';
import {PageNameText} from '../../../components/texts/pageNameText';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';
import {ScrollableView} from '../../../helpers/scrollableView';
import {ProviderCard} from './components/providerCard';
import {SubcategoryCard} from './components/subcategoryCard';

export const ConfirmBooking = ({navigation}: any) => {
  return (
    <SafeAreaView style={CommonStyles.screenMain}>
      <ScrollableView>
        <View style={styles.topRow}>
          <View style={{width: '15%', alignItems: 'flex-start'}}>
            <BackIcon black onPress={() => navigation.goBack()} />
          </View>
          <View
            style={{width: '90%', alignItems: 'center', marginLeft: '-19%'}}>
            <PageNameText>Confirm Booking</PageNameText>
          </View>
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.head, {marginBottom: 10}]}>
            Selected Services
          </Text>
          <SubcategoryCard hideCheckmark />
          <SubcategoryCard hideCheckmark />
          <SubcategoryCard hideCheckmark />
          <SubcategoryCard hideCheckmark />
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.head, {marginBottom: 10}]}>
            Selected Providers
          </Text>
          <ProviderCard />
          <ProviderCard />
          <ProviderCard />
          <ProviderCard />
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text style={[styles.field, {marginBottom: 5}]}>Date</Text>
            <Text style={styles.value}>25th October</Text>
          </View>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text style={[styles.field, {marginBottom: 5}]}>Time</Text>
            <Text style={styles.value}>02:25 PM</Text>
          </View>
        </View>
        <View style={{width: '90%', marginVertical: 15}}>
          <Text style={[styles.head]}>Payment Method</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.value}>Cash</Text>
          <CheckMark circle />
        </View>
        <View style={styles.row}>
          <Text style={styles.value}>Wallet</Text>
          <CheckMark circle />
        </View>
        <View style={styles.row}>
          <Text style={styles.value}>Credit Card</Text>
          <CheckMark circle />
        </View>
        <View style={{width: '90%', marginVertical: 15}}>
          <Text style={[styles.field]}>Card Details</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.value}>Arham Saqib</Text>
          <Text style={styles.value}>**** **** **** 1234</Text>
        </View>
        <Text
          onPress={() => {}}
          style={[
            styles.field,
            {marginVertical: 5, textDecorationLine: 'underline'},
          ]}>
          Use different Card
        </Text>
        <View style={{width: '90%', marginVertical: 15}}>
          <Text style={[styles.head]}>Apply Coupon Code</Text>
        </View>
        <View style={styles.row}>
          <View style={{width: '68%'}}>
            <MyTextInput style={{borderRadius: 5}} />
          </View>
          <View style={{width: '30%'}}>
            <MyButton style={{borderRadius: 5}} title="Apply Now" noIcon />
          </View>
        </View>
        <View style={{width: '90%', marginVertical: 15}}>
          <Text style={[styles.head]}>Instructions</Text>
        </View>
        <View style={{width: '90%', marginTop: 0}}>
          <MyTextInput style={{borderRadius: 5, height: 100}} />
        </View>
        <View style={styles.btnRow}>
          <View style={{width: '45%'}}>
            <MyButton secondary title="Back" />
          </View>
          <View style={{width: '45%'}}>
            <MyButton title="Send Request" />
          </View>
        </View>
      </ScrollableView>
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
  head: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 18,
    color: COLORS.WF_TITLE,
  },
  value: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },

  valueBold: {
    fontFamily: FONTS.P_BOLD,
    fontSize: 20,
    color: COLORS.WF_TITLE,
  },
  field: {
    fontFamily: FONTS.P_Light,
    fontSize: 12,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },
  row: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
