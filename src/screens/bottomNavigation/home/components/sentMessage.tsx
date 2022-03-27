import React from 'react';
import {StyleSheet, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

interface Props {
  message?: string;
}

export const SentMessage = (props: Props) => {
  return (
    <LinearGradient
      colors={[COLORS.MAIN_1, COLORS.MAIN_2]}
      style={[styles.main]}>
      <Text style={styles.text}>{props.message ?? 'Sent Message'}</Text>
    </LinearGradient>
  );
};

export const styles = StyleSheet.create({
  main: {
    width: '100%',
    padding: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    minHeight: 45,
    marginVertical: 5,
  },
  text: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 13,
    color: 'white',
    alignItems: 'center',
  },
});
