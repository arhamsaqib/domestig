import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CheckMark} from '../../../../../components/checkmark';
import {GreenCircle} from '../../../../../components/greenCircle';
import {COLORS} from '../../../../../constants/colors';
import {FONTS} from '../../../../../constants/fonts';

interface Props {
  name?: string;
}

export const LanguageCard = (props: Props) => {
  return (
    <View style={styles.main}>
      <View style={styles.row1}>
        <GreenCircle s41></GreenCircle>
        <Text style={styles.name}>{props.name ?? 'L1'}</Text>
      </View>
      <CheckMark circle />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    //borderWidth: 1,
    backgroundColor: 'white',
    height: 71,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  row1: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
    marginLeft: 10,
  },
  pencil: {
    height: 15,
    width: 15,
  },
});
