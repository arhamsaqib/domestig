import React from 'react';
import {
  ActivityIndicator,
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';
import {ICONS} from '../constants/icons';

interface Props extends TouchableOpacityProps {
  loading?: boolean;
  noIcon?: boolean;
  textStyle?: StyleProp<TextStyle>;
  title?: string;
  secondary?: boolean;
}

export const MyButton = (props: Props) => {
  const {
    style,
    loading,
    disabled,
    noIcon,
    textStyle,
    title,
    secondary,
    ...rest
  } = props;
  return (
    <TouchableOpacity
      disabled={disabled}
      {...rest}
      style={[styles.main, secondary && styles.btnSecondary, style]}>
      {!loading && (
        <>
          <Text
            style={[styles.text, secondary && styles.txtSecondary, textStyle]}>
            {title ?? 'Button'}
          </Text>
          {!noIcon && (
            <>
              {!secondary && (
                <Image source={ICONS.arrowRight} style={styles.arrow} />
              )}
              {secondary && (
                <Image source={ICONS.arrowRightBlack} style={styles.arrow} />
              )}
            </>
          )}
        </>
      )}
      {loading && <ActivityIndicator color={COLORS.WHITE} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 48,
    borderRadius: 99,
    width: '100%',
    backgroundColor: COLORS.MAIN_1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  text: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 17,
    color: COLORS.WHITE,
  },
  arrow: {
    width: 16.62,
    height: 7.99,
    marginLeft: 10,
  },
  txtSecondary: {
    color: COLORS.MAIN_TEXT,
  },
  btnSecondary: {
    borderWidth: 1,
    borderColor: COLORS.MAIN_BODYTEXT,
    backgroundColor: 'transparent',
  },
});
