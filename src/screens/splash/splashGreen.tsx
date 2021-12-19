import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {ICONS} from '../../constants/icons';

export const SplashGreen = () => {
  return (
    <View style={styles.main}>
      <Image source={ICONS.logo_white} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.MAIN_1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 255.32,
    height: 106,
  },
});
