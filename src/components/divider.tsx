import React from 'react';
import {View} from 'react-native';
import {COLORS} from '../constants/colors';

export const Divider = () => {
  return (
    <View
      style={{
        borderWidth: 0.25,
        width: '100%',
        borderColor: COLORS.MAIN_SUBTEXT,
        marginVertical: 5,
        opacity: 0.4,
      }}
    />
  );
};
