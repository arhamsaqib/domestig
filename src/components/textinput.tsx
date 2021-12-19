import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';

interface Props extends TextInputProps {}

export const MyTextInput = (props: Props) => {
  const {style, ...rest} = props;
  return (
    <TextInput
      style={[styles.main, style]}
      placeholderTextColor="#BCBCBC"
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  main: {
    height: 45,
    borderWidth: 1,
    borderRadius: 99,
    padding: 10,
    borderColor: '#BCBCBC',
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.MAIN_TEXT,
    width: '100%',
  },
});
