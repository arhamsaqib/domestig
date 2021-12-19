import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {COLORS} from '../constants/colors';

interface Props {
  state?(val?: boolean): void;
}

export const CheckBox = (props: Props) => {
  const [state, setState] = useState(false);
  function onStateSet() {
    setState(!state);
    props.state && props.state(!setState);
  }
  return (
    <TouchableOpacity
      onPress={onStateSet}
      style={[styles.main, !state && styles.inactive, state && styles.active]}>
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
