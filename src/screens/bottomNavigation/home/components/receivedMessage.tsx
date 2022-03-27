import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../../constants/colors';

import {FONTS} from '../../../../constants/fonts';

interface Props {
  message?: string;
}

export const ReceivedMessage = (props: Props) => {
  return (
    <View style={[styles.main]}>
      <Text style={styles.text}>{props.message ?? 'Sent Message'}</Text>
    </View>
  );
};

export const styles = StyleSheet.create({
  main: {
    width: '100%',
    padding: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 0,
    minHeight: 45,
    backgroundColor: '#e2e2e2',
    marginVertical: 5,
  },
  text: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 13,
    color: COLORS.WF_TITLE,
    alignItems: 'center',
  },
});
