import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';
import {ICONS} from '../constants/icons';
import {generateGreetings} from '../helpers/greetings';
import {Avatar} from './avatar';
import Icon from 'react-native-vector-icons/Ionicons';
import {MEDIA_URL} from '../constants/url';

interface Props {
  onNotificationPress?(): void;
  name?: string;
  notificationCount?: string;
  avatar?: any;
}

export const HeadCard = (props: Props) => {
  return (
    <LinearGradient colors={['#f1f7ec', 'white']} style={styles.main}>
      <SafeAreaView style={styles.topView}>
        <View
          style={{width: '50%', flexDirection: 'row', alignItems: 'center'}}>
          <Avatar source={props.avatar && {uri: MEDIA_URL + props.avatar}} />
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              marginLeft: 5,
            }}>
            <Text style={[styles.gm]}>{generateGreetings()}</Text>
            <Text style={[styles.name]}>{props.name ?? 'User'}</Text>
          </View>
        </View>
        <View style={styles.notificationContainer}>
          {/* <Image source={ICONS.notification} style={styles.notification} /> */}
          {/* <MainBodyText>{props.notificationCount}</MainBodyText> */}
          <View style={styles.notifCont}>
            <Text style={styles.notifText}>{props.notificationCount}</Text>
          </View>
          <TouchableOpacity
            style={[{transform: [{rotate: '335deg'}]}]}
            onPress={props.onNotificationPress}>
            <Icon
              name="notifications-outline"
              size={27}
              color="black"
              style={{borderRadius: 27}}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <View style={{width: '90%'}}>
        <View style={{marginTop: 0, width: '70%', alignSelf: 'flex-start'}}>
          <Text style={styles.headTxt}>What services do you need?</Text>
        </View>
      </View>

      <View style={styles.bottom}>
        <Image
          source={ICONS.vaccum}
          style={styles.vaccumImg}
          resizeMethod="scale"
          resizeMode="contain"
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    //height: 277,
    height: 307, //added new
    width: '100%',
    alignItems: 'center',
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '60%',
    height: '60%',
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
  vaccumImg: {
    // height: 162.81,
    // width: 242.13,
    height: '100%',

    width: '100%',
  },
  topView: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30, //added new
  },
  gm: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 12,
    color: COLORS.WF_TITLE,
  },
  name: {
    fontFamily: FONTS.P_SEMIBOLD,
    fontSize: 20,
    color: COLORS.WF_TITLE,
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
    color: COLORS.WF_TITLE,
  },
  notifCont: {
    padding: 3,
    backgroundColor: COLORS.MAIN_1,
    borderRadius: 50,
    height: 18,
    minWidth: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -12,
    marginRight: -5,
  },
  notifText: {
    color: 'white',
    fontSize: 10,
    fontFamily: FONTS.P_MEDIUM,
  },
});
