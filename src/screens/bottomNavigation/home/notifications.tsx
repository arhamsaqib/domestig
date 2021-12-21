import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native';
import {CommonStyles} from '../../../common/styles';
import {PageNameText} from '../../../components/texts/pageNameText';
import {FONTS} from '../../../constants/fonts';
import {NotificationCard} from './components/notificationCard';

export const Notification = () => {
  return (
    <SafeAreaView style={CommonStyles.screenMain}>
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <PageNameText>Notifications</PageNameText>
        <Text onPress={() => {}} style={styles.optionText}>
          Mark all as read
        </Text>
      </View>
      <View style={{marginTop: 10, width: '100%'}}>
        <NotificationCard />
        <NotificationCard read />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard />
        <NotificationCard read />
        <NotificationCard />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  optionText: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 13,
    color: '#222222',
  },
});
