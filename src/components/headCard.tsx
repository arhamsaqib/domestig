import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';
import {ICONS} from '../constants/icons';
import {Avatar} from './avatar';

interface Props {
  onNotificationPress?(): void;
  name?: string;
}

export const HeadCard = (props: Props) => {
  return (
    <LinearGradient colors={['#f1f7ec', 'white']} style={styles.main}>
      <SafeAreaView style={styles.topView}>
        <View
          style={{width: '50%', flexDirection: 'row', alignItems: 'center'}}>
          <Avatar />
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginLeft: 5,
            }}>
            <Text style={[styles.gm]}>Good Morning</Text>
            <Text style={[styles.name]}>{props.name ?? 'Arham S.'}</Text>
          </View>
        </View>
        <View style={styles.notificationContainer}>
          <TouchableOpacity onPress={props.onNotificationPress}>
            <Image source={ICONS.notification} style={styles.notification} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={{width: '90%'}}>
        <View style={{marginTop: 0, width: '70%', alignSelf: 'flex-start'}}>
          <Text style={styles.headTxt}>What services do you need?</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <Image source={ICONS.vaccum} style={styles.vaccumImg} />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 277,
    width: '100%',
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  vaccumImg: {
    height: 162.81,
    width: 242.13,
  },
  topView: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gm: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 12,
    color: COLORS.MAIN_SUBTEXT,
  },
  name: {
    fontFamily: FONTS.P_SEMIBOLD,
    fontSize: 20,
    color: COLORS.MAIN_SUBTEXT,
  },
  notification: {
    width: 26.96,
    height: 27,
  },
  notificationContainer: {
    width: '30%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  headTxt: {
    fontFamily: FONTS.P_SEMIBOLD,
    fontSize: 25,
    color: COLORS.MAIN_SUBTEXT,
  },
});
