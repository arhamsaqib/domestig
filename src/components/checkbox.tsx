import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {COLORS} from '../constants/colors';

interface Props {
  onChangeVal?(val: boolean): void;
  value?: boolean;
}

export const CheckBox = (props: Props) => {
  const {value} = props;
  function onStateSet() {
    props.onChangeVal && props.onChangeVal(!value);
  }
  return (
    <TouchableOpacity
      onPress={onStateSet}
      style={[styles.main, !value && styles.inactive, value && styles.active]}>
      <Icon name="checkmark-outline" size={18} color={'white'} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    width: 20,
    height: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactive: {
    backgroundColor: '#C4C4C4',
  },
  active: {
    backgroundColor: COLORS.MAIN_2,
  },
});
