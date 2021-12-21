import React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/colors';
import {ICONS} from '../constants/icons';

interface Props {
  s40?: boolean;
  s41?: boolean;
  s50?: boolean;
  children?: any;
  onPress?(): void;
  broom?: boolean;
  notPressable?: boolean;
}

export const GreenCircle = (props: Props) => {
  const {s50, s40, s41} = props;
  return (
    <TouchableOpacity
      disabled={props.notPressable}
      onPress={props.onPress}
      style={[
        style.main,
        s50 && style.s50,
        s41 && style.s41,
        s40 && style.s40,
      ]}>
      {props.children}
      {props.broom && (
        <Image
          source={ICONS.broom}
          style={[
            style.broomS60,
            s50 && style.broomS50,
            s41 && style.broomS41,
            s40 && style.broomS40,
          ]}
        />
      )}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  main: {
    height: 60,
    width: 60,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f1f7ec',
  },
  s40: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
  s50: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  s41: {
    height: 41,
    width: 41,
    borderRadius: 41,
  },
  broomS60: {
    width: 23.79,
    height: 34,
  },
  broomS40: {
    width: 15.86,
    height: 22.67,
  },
  broomS50: {
    width: 19.83,
    height: 28.33,
  },
  broomS41: {
    width: 16.26,
    height: 23.23,
  },
});
