import {TabRouter} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {RootStateOrAny, useSelector} from 'react-redux';
import {createBookingRequest} from '../../../api/bookingRequest';
import {createBookings} from '../../../api/bookings';
import {CommonStyles} from '../../../common/styles';
import {BackIcon} from '../../../components/backIcon';
import {MyButton} from '../../../components/button';
import {CheckMark} from '../../../components/checkmark';
import {RadioBtn} from '../../../components/radio';
import {MyTextInput} from '../../../components/textinput';
import {PageNameText} from '../../../components/texts/pageNameText';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';
import {ConvertDateToObject} from '../../../helpers/convertDateTobject';
import {extractKeys, joinArrayKeys} from '../../../helpers/extractKeys';
import {getRndInteger} from '../../../helpers/generateRandomNumber';
import {ScrollableView} from '../../../helpers/scrollableView';
import {ProviderCard} from './components/providerCard';
import {SubcategoryCard} from './components/subcategoryCard';

export const ConfirmBooking = ({navigation, route}: any) => {
  const [loader, setLoader] = useState(false);
  const [date, setDate] = useState(new Date());
  const [payment, setPayment] = useState('');
  const [instructions, setInstructions] = useState('');
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  const renderServices = (item: any) => {
    return <SubcategoryCard name={item.name} hideCheckmark />;
  };
  const renderProviders = (item: any) => {
    return <ProviderCard name={item.name} hideCheckMark />;
  };
  useEffect(() => {
    //console.log(route.params, 'params');
  }, []);
  const d = ConvertDateToObject(date);
  async function onSubmit() {
    const separate = extractKeys(route.params.services);
    const services = joinArrayKeys(separate);
    setLoader(true);
    const code = getRndInteger();
    const booking = {
      customer_id: state.id,
      schedule: 'none',
      date: date.toString(),
      time: date.toString(),
      payment_type: payment,
      instructions: instructions,
      status: 'pending',
      verification_code: code.toString(),
      services: services,
      category_name: route.params.categoryName,
    };

    const res = await createBookings(booking);
    //console.log(res, 'Booking');
    if (res.id !== undefined) {
      const d = {
        booking_id: res.id,
        providers: route.params.providers,
      };
      const req = await createBookingRequest(d).finally(() => setLoader(false));
      //console.log(req, 'requests');
      navigation.navigate('servicesMain');
    }
  }
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
          {/* <FlatList renderItem={renderServices} data={route.params.services} /> */}
          {route.params.services.map(renderServices)}
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.head, {marginBottom: 10}]}>
            Selected Providers
          </Text>
          {/* <FlatList
            renderItem={renderProviders}
            data={route.params.providers}
          /> */}
          {route.params.providers.map(renderProviders)}
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
            <Text style={styles.value}>
              {d.date} {d.month}
            </Text>
          </View>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text style={[styles.field, {marginBottom: 5}]}>Time</Text>
            <Text style={styles.value}>
              {d.hours}:{d.minutes}
            </Text>
          </View>
        </View>
        <View style={{width: '90%', marginVertical: 15}}>
          <Text style={[styles.head]}>Payment Method</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.value}>Cash</Text>
          <RadioBtn
            circle
            active={payment === 'cash' && true}
            onPress={() => setPayment('cash')}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.value}>Wallet</Text>
          <RadioBtn
            active={payment === 'wallet' && true}
            circle
            onPress={() => setPayment('wallet')}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.value}>Credit Card</Text>
          <RadioBtn
            active={payment === 'card' && true}
            circle
            onPress={() => setPayment('card')}
          />
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
          <MyTextInput
            multiline
            style={{borderRadius: 5, height: 100}}
            onChangeText={setInstructions}
          />
        </View>
        <View style={styles.btnRow}>
          <View style={{width: '45%'}}>
            <MyButton secondary title="Back" />
          </View>
          <View style={{width: '45%'}}>
            <MyButton
              title="Send Request"
              loading={loader}
              onPress={onSubmit}
            />
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
