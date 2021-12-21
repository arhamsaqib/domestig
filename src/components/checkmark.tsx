import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../constants/colors';

interface Props {
  circle?: boolean;
  tick?: boolean;
}

export const CheckMark = (props: Props) => {
  const [active, setActive] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setActive(!active)}
      style={[styles.main, active && styles.active]}>
      {props.tick && (
        <Icon
          name="checkmark-outline"
          size={12}
          color={active ? COLORS.MAIN_1 : 'black'}
        />
      )}
      {props.circle && active && <View style={[styles.circle]}></View>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 15,
    width: 15,
    borderRadius: 15,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    borderColor: COLORS.MAIN_1,
  },
  circle: {
    height: 10,
    width: 10,
    borderRadius: 10,
    backgroundColor: COLORS.MAIN_1,
  },
});
