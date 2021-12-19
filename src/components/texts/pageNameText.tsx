import React from 'react';
import {StyleSheet, Text, TextProps} from 'react-native';
import {COLORS} from '../../constants/colors';
import {FONTS} from '../../constants/fonts';

interface Props extends TextProps {
  white?: boolean;
}

export const PageNameText = (props: Props) => {
  const {style, children, white} = props;
  return (
    <Text style={[styles.main, white && {color: COLORS.WHITE}, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  main: {
    fontSize: 20,
    fontFamily: FONTS.P_MEDIUM,
    color: '#222222',
  },
});
