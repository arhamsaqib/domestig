import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Avatar} from '../../../../components/avatar';
import {COLORS} from '../../../../constants/colors';
import {ProfileDetails} from './details';
import {Reviews} from './reviews';
import {FONTS} from '../../../../constants/fonts';
import {ICONS} from '../../../../constants/icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackIcon} from '../../../../components/backIcon';
import Icon from 'react-native-vector-icons/Ionicons';

const TobTabs = createMaterialTopTabNavigator();

export const AccountTopBar = ({navigation}: any) => {
  return (
    <>
      <View style={styles.card}>
        <SafeAreaView
          style={{width: '90%', alignItems: 'center', alignSelf: 'center'}}>
          <View style={styles.row}>
            <BackIcon black onPress={() => navigation.goBack()} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="log-out-outline"
                size={20}
                color={COLORS.MAIN_SUBTEXT}
              />
              <Text style={[styles.log, {marginLeft: 5}]}>Log-out</Text>
            </View>
          </View>
          <View style={{marginVertical: 20}} />
          <Avatar customSize size={110} upload pressable />
          <Text style={[styles.name, {marginVertical: 3}]}>Arham Saqib</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={ICONS.rating}
              style={[styles.rating, {marginRight: 5}]}
            />
            <Text style={styles.ratingTxt}>{'4.2'} out of 5</Text>
          </View>
        </SafeAreaView>
      </View>
      <TobTabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.MAIN_2,
          tabBarInactiveTintColor: COLORS.MAIN_SUBTEXT,
          tabBarLabelStyle: styles.label,
          tabBarIndicatorStyle: {borderColor: COLORS.MAIN_2, borderWidth: 1},
        }}>
        <TobTabs.Screen
          name="profileDetails"
          component={ProfileDetails}
          options={{title: 'Profile Details'}}
        />
        <TobTabs.Screen
          name="profileReviews"
          component={Reviews}
          options={{title: 'Reviews'}}
        />
      </TobTabs.Navigator>
    </>
  );
};
const styles = StyleSheet.create({
  name: {
    fontFamily: FONTS.P_SEMIBOLD,
    fontSize: 20,
    color: COLORS.WF_TITLE,
  },
  label: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
  },
  rating: {
    height: 12,
    width: 12,
  },
  ratingTxt: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 10,
    color: COLORS.MAIN_TEXT,
    opacity: 0.42,
  },
  card: {
    backgroundColor: '#eff4eb',
    width: '100%',
    alignItems: 'center',
    height: 304,
    //flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  log: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 12,
    color: COLORS.MAIN_SUBTEXT,
  },
});
