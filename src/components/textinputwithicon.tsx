import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends TextInputProps {
  icon?: any;
  ref?: any;
}

export const MyTextInputWithIcon = (props: Props) => {
  const [hideInput, setHideInput] = useState(false);
  const {style, secureTextEntry, icon, ...rest} = props;
  return (
    <View style={styles.main}>
      <View style={styles.iconContainer}>{icon}</View>
      <TextInput
        ref={props.ref}
        style={[styles.ti, style]}
        placeholderTextColor="#BCBCBC"
        {...rest}
        secureTextEntry={hideInput}
      />
      {secureTextEntry && (
        <View style={styles.iconContainer}>
          {!hideInput && (
            <Icon
              name="eye-outline"
              size={16}
              onPress={() => setHideInput(true)}
            />
          )}
          {hideInput && (
            <Icon
              name="eye-off-outline"
              size={16}
              onPress={() => setHideInput(false)}
              color="#BCBCBC"
            />
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  ti: {
    height: 45,
    //padding: 10,
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.MAIN_TEXT,
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
});
