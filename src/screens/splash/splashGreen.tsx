import React, {useEffect} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {COLORS} from '../../constants/colors';
import {ICONS} from '../../constants/icons';
import {wait} from '../../helpers/wait';

export const SplashGreen = ({navigation}: any) => {
  useEffect(() => {
    wait(3000).then(() => {
      navigation.replace('authStack');
    });
  }, []);
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
