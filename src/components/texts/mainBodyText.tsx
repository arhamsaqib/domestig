import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {COLORS} from '../../constants/colors';
import {FONTS} from '../../constants/fonts';

interface Props extends TextProps {}

export const MainBodyText = (props: Props) => {
  const {style, children, ...rest} = props;
  return (
    <Text {...rest} style={[styles.main, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  main: {
    fontSize: 15,
    fontFamily: FONTS.P_REGULAR,
    color: COLORS.MAIN_BODYTEXT,
  },
});
