import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends TextInputProps {
  icon?: any;
  name?: string;
}

export const DropDown = (props: Props) => {
  const [hideInput, setHideInput] = useState(false);
  const {style, secureTextEntry, icon, ...rest} = props;
  return (
    <View style={styles.main}>
      <View style={styles.iconContainer}>{icon}</View>
      <View style={[styles.ti]}>
        <Text style={styles.name}>{props.name}</Text>
      </View>

      <View style={styles.iconContainer}>
        <Icon name="chevron-down-outline" size={16} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ti: {
    height: 45,
    //padding: 10,
    justifyContent: 'center',
    width: '80%',
  },
  main: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#BCBCBC',
    borderWidth: 1,
    borderRadius: 99,
  },
  iconContainer: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.MAIN_TEXT,
  },
});
