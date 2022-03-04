import React from 'react';
import {StyleSheet, View, ViewProps} from 'react-native';
import {COLORS} from '../constants/colors';

export const BottomSheet = (props: ViewProps) => {
  const {style, children, ...rest} = props;
  return (
    <View {...rest} style={[styles.main, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: COLORS.WHITE,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
  },
});
