import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {GreenCircle} from '../../../../components/greenCircle';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

interface Props {
  style?: StyleProp<ViewStyle>;
  name?: string;
  onPress?(): void;
}

export const CategoryCard = (props: Props) => {
  return (
    <View style={[styles.main, props.style]}>
      <GreenCircle broom onPress={props.onPress} />
      <Text style={styles.txt}>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  txt: {
    fontFamily: FONTS.P_MEDIUM,
    fontSize: 11,
    color: COLORS.WF_TITLE,
    marginTop: 2,
  },
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
});
