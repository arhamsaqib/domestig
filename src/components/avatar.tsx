import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {ICONS} from '../constants/icons';

interface Props {
  size?: number;
  upload?: boolean;
  verified?: boolean;
  customSize?: boolean;
  source?: any;
  onPress?(): void;
  pressable?: boolean;
}

export const Avatar = (props: Props) => {
  const {upload, verified, size, customSize, source, onPress, pressable} =
    props;
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={!pressable}
      style={[
        styles.main,
        styles.ratio,
        customSize && {height: size, width: size, borderRadius: size},
      ]}>
      <Image
        style={[
          styles.ratio,
          customSize && {height: size, width: size, borderRadius: size},
        ]}
        source={source ?? ICONS.user}
      />
      {(verified || upload) && (
        <View style={[styles.sideIconContainer]}>
          {upload && (
            <Image source={ICONS.upload} style={[styles.uploadIcon]} />
          )}
          {verified && (
            <Image source={ICONS.verified} style={[styles.verifiedIcon]} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ratio: {
    height: 50,
    width: 50,
    borderRadius: 50,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  uploadIcon: {
    width: 25,
    height: 25,
  },
  verifiedIcon: {
    width: 18,
    height: 18,
  },
  sideIconContainer: {
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    marginLeft: '-30%',
  },
});
