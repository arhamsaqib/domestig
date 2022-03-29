import React from 'react';
import {StyleSheet, View} from 'react-native';
import {COLORS} from '../constants/colors';

interface Props {
  page: number;
}

export const PageIndicator = (props: Props) => {
  const {page} = props;
  const pNo = page - 1;
  const total = [1, 1, 1];
  //   const count = 3;
  function mapDots(item: any, index: number) {
    return (
      <View key={index} style={[styles.dot, pNo === index && styles.active]} />
    );
  }
  return <View style={styles.main}>{total.map(mapDots)}</View>;
};

export const styles = StyleSheet.create({
  dot: {
    height: 6,
    width: 6,
    borderRadius: 6,
    backgroundColor: COLORS.light_green,
    marginRight: 3,
  },
  active: {
    height: 8,
    width: 8,
    borderRadius: 8,
    backgroundColor: COLORS.MAIN_1,
    marginRight: 3,
  },
  main: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
