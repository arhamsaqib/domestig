import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';

interface Props {
  onPress?(): void;
  name?: string;
  active?: boolean;
}

export const ToggleButton = (props: Props) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={[styles.main, !props.active && styles.inactive]}>
      <Text style={[styles.txt, !props.active && {color: COLORS.MAIN_SUBTEXT}]}>
        {props.name ?? 'Btn'}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 32,
    backgroundColor: COLORS.MAIN_1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
  },
  txt: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 12,
    color: COLORS.WHITE,
  },
  inactive: {
    borderWidth: 1,
    borderColor: COLORS.MAIN_SUBTEXT,
    backgroundColor: 'white',
  },
});
