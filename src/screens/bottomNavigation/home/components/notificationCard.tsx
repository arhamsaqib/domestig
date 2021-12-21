import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {GreenCircle} from '../../../../components/greenCircle';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  read?: boolean;
  title?: string;
  time?: string;
}

export const NotificationCard = (props: Props) => {
  return (
    <TouchableOpacity
      style={[styles.main, (props.read && styles.read) ?? styles.unread]}>
      <View style={{width: '5%', justifyContent: 'center'}}>
        <GreenCircle broom s40 />
      </View>
      <View style={{width: '65%'}}>
        <Text style={styles.title}>
          {props.title ??
            'Lorem Ipsum is simply dummy of text of the of and industry.'}
        </Text>
        <Text style={[styles.desc, {marginTop: 5}]}>
          {props.time ?? '2'} hours ago
        </Text>
      </View>
      <View
        style={{
          width: '5%',
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Icon onPress={() => {}} name="ellipsis-vertical-outline" size={20} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    minHeight: 75,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
  },
  unread: {
    backgroundColor: '#f7f7f7',
  },
  read: {
    backgroundColor: 'white',
  },
  title: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 13,
    color: COLORS.WF_TITLE,
  },
  desc: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 11,
    color: COLORS.WF_TITLE,
    opacity: 0.42,
  },
});
