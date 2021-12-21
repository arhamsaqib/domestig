import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../../../../../constants/fonts';

interface Props {
  title?: string;
  value?: string;
}

export const ReferralsCard = (props: Props) => {
  return (
    <View style={styles.main}>
      <Text style={[styles.head, {marginBottom: 10}]}>
        {props.value ?? '123'}
      </Text>
      <Text style={[styles.title]}>{props.title ?? 'Something'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    //width:160,
    height: 91,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    //borderWidth: 1,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 3,
  },
  title: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 12,
    color: '#666666',
  },
  head: {
    fontFamily: FONTS.P_BOLD,
    fontSize: 25,
    color: '#222222',
  },
});
