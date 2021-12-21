import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {ICONS} from '../../../../constants/icons';

interface Props {
  title?: string;
  onPress?(): void;
  status?: string;
}

export const HistoryCard = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.main}>
      <View style={styles.iconCont}>
        <Image source={ICONS.broom} style={styles.icon} />
      </View>
      <View
        style={{
          width: '75%',
          alignItems: 'center',
          justifyContent: 'center',
          //   borderWidth: 1,
          height: '100%',
          backgroundColor: '#f7f7f7',
        }}>
        <View
          style={{
            width: '90%',
            alignItems: 'flex-start',
            height: '80%',
            justifyContent: 'flex-start',
          }}>
          <Text style={[styles.title, {marginBottom: 10}]}>
            {props.title ?? 'Wipe down appliances (fridge, etc)'}
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={[styles.boldDesc]}>Status: </Text>
            <Text style={[styles.desc]}>{props.status ?? 'In-progress'}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'f7f7f7',
    flexDirection: 'row',
    height: 93,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  icon: {
    height: 58.59,
    width: 41,
  },
  iconCont: {
    backgroundColor: '#f1f7ec',
    justifyContent: 'center',
    alignItems: 'center',
    width: '25%',
    // borderWidth: 1,
    height: '100%',
  },
  title: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
  boldDesc: {
    fontFamily: FONTS.P_MEDIUM,
    fontSize: 12,
    color: COLORS.WF_TITLE,
    opacity: 0.42,
  },
  desc: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 12,
    color: COLORS.WF_TITLE,
    opacity: 0.42,
  },
});
