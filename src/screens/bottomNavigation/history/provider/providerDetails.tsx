import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {ProviderReviews} from './providerReviews';
import {BottomCard} from '../../../../components/bottomCard';
import {ProviderProfileDetails} from './providerProfileDetails';
import {Avatar} from '../../../../components/avatar';
import {FONTS} from '../../../../constants/fonts';
import {COLORS} from '../../../../constants/colors';
import {ICONS} from '../../../../constants/icons';
import {MEDIA_URL} from '../../../../constants/url';

const TobTabs = createMaterialTopTabNavigator();

interface Props {
  modalVisibility: boolean;
  onOutsidePress?(): void;
  data?: any;
}

export const ProviderDetails = (props: Props) => {
  const {data} = props;
  return (
    <BottomCard
      style={{height: '80%'}}
      onOutsidePress={props.onOutsidePress}
      modalVisibility={props.modalVisibility}>
      <View style={{width: '90%', alignItems: 'center', alignSelf: 'center'}}>
        <Avatar
          customSize
          size={80}
          source={data.avatar && {uri: MEDIA_URL + data.avatar}}
          verified
        />
        <Text style={[styles.name, {marginVertical: 3}]}>{data.name}</Text>
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
      </View>
      <TobTabs.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.MAIN_2,
          tabBarInactiveTintColor: COLORS.MAIN_SUBTEXT,
          tabBarLabelStyle: styles.label,
          tabBarIndicatorStyle: {borderColor: COLORS.MAIN_2, borderWidth: 1},
        }}>
        <TobTabs.Screen
          name="providerDetails"
          component={ProviderProfileDetails}
          options={{title: 'Profile Details'}}
          initialParams={{provider: data}}
        />
        <TobTabs.Screen
          name="providerReviews"
          component={ProviderReviews}
          options={{title: 'Reviews'}}
        />
      </TobTabs.Navigator>
    </BottomCard>
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
});
