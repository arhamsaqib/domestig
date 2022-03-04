import React from 'react';
import {View, ViewProps} from 'react-native';
import {COLORS} from '../constants/colors';

export const DividerP = (props: ViewProps) => {
  const {style} = props;
  return (
    <View
      style={[
        {
          borderWidth: 0.25,
          width: '100%',
          borderColor: COLORS.MAIN_SUBTEXT,
          marginVertical: 5,
          opacity: 0.4,
        },
        style,
      ]}
    />
  );
};
