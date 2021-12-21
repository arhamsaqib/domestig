import React from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {CommonStyles} from '../../../common/styles';
import {Avatar} from '../../../components/avatar';
import {BackIcon} from '../../../components/backIcon';
import {MyButton} from '../../../components/button';
import {GreenCircle} from '../../../components/greenCircle';
import {PageNameText} from '../../../components/texts/pageNameText';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';
import {ICONS} from '../../../constants/icons';
import {ScrollableView} from '../../../helpers/scrollableView';

export const HistoryDetails = ({navigation}: any) => {
  return (
    <SafeAreaView style={CommonStyles.screenMain}>
      <ScrollableView>
        <View style={styles.topRow}>
          <View style={{width: '15%', alignItems: 'flex-start'}}>
            <BackIcon black onPress={() => navigation.goBack()} />
          </View>
          <View
            style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
            <PageNameText>Booking History</PageNameText>
          </View>
        </View>
        <View style={styles.categoryNameContainer}>
          <GreenCircle broom s41 />
          <Text style={[styles.name, {marginLeft: 5}]}>
            Service Category Name
          </Text>
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
            <Text style={[styles.field, {marginBottom: 5}]}>Booking ID</Text>
            <Text style={styles.value}>#12345</Text>
          </View>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text style={[styles.field, {marginBottom: 5}]}>Status</Text>
            <Text style={styles.value}>Complete</Text>
          </View>
        </View>
        <View style={{width: '90%', marginVertical: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
          <Text style={[styles.value]}>Lorem Ipsum is simply dummy text</Text>
        </View>
        <View style={{width: '90%', marginVertical: 10}}>
          <Text style={styles.head}>Provider details</Text>
        </View>
        <View style={styles.pDetailsContainer}>
          <View style={styles.avatrNameCont}>
            <Avatar customSize size={41} />
            <Text style={[styles.name, {marginLeft: 5}]}>Arham Saqib</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.valueBold}>24</Text>
            <Text style={styles.value}>/h</Text>
          </View>
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text style={[styles.field, {marginBottom: 5}]}>
              Before work image
            </Text>
            <Image source={ICONS.noimage} style={styles.img} />
          </View>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text style={[styles.field, {marginBottom: 5}]}>
              After work image
            </Text>
            <Image source={ICONS.noimage} style={styles.img} />
          </View>
        </View>
        <View style={{width: '90%', marginVertical: 20}}>
          <Text style={styles.head}>Invoice</Text>
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
            <Text style={[styles.field, {marginBottom: 5}]}>
              Service start time
            </Text>
            <Text style={styles.value}>10:35 AM</Text>
          </View>
          <View
            style={{
              width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}>
            <Text style={[styles.field, {marginBottom: 5}]}>
              Service end time
            </Text>
            <Text style={styles.value}>02:25 PM</Text>
          </View>
        </View>
        <View style={{width: '90%', marginVertical: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>
            Total Serving Time
          </Text>
          <Text style={[styles.value]}>2 hours 20 minutes</Text>
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={[styles.name, {fontSize: 13}]}>Total Amount</Text>
          <Text style={[styles.name, {fontSize: 13}]}>$52</Text>
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={[styles.name, {fontSize: 13}]}>Extra work charge</Text>
          <Text style={[styles.name, {fontSize: 13}]}>$10</Text>
        </View>
        <View
          style={{
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
          }}>
          <Text style={[styles.name, {fontSize: 13}]}>Amount</Text>
          <Text style={[styles.name, {fontSize: 13}]}>$60</Text>
        </View>
        <View style={{width: '90%', marginVertical: 20}}>
          <MyButton title="Cancel Booking" />
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
  categoryNameContainer: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 16,
    color: COLORS.WF_TITLE,
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
  pDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  avatrNameCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 80,
    width: '100%',
  },
});
