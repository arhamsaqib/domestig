import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {COLORS} from '../../constants/colors';
import {FONTS} from '../../constants/fonts';

interface Props extends TextProps {}

export const TitleText = (props: Props) => {
  const {style, children} = props;
  return <Text style={[styles.main, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  main: {
    fontSize: 30,
    fontFamily: FONTS.P_SEMIBOLD,
    color: COLORS.MAIN_SUBTEXT,
  },
});
