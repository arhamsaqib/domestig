import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {GreenCircle} from '../../../../../components/greenCircle';
import {COLORS} from '../../../../../constants/colors';
import {FONTS} from '../../../../../constants/fonts';
import {ICONS} from '../../../../../constants/icons';

export const AddressCard = () => {
  return (
    <View style={styles.main}>
      <View style={styles.row1}>
        <GreenCircle s41>
          <Image source={ICONS.location} style={{height: 21, width: 21}} />
        </GreenCircle>
        <Text style={styles.name}>{'Home 1'}</Text>
      </View>
      <Image source={ICONS.pencil} style={styles.pencil} />
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
    marginLeft: 5,
  },
  pencil: {
    height: 15,
    width: 15,
  },
});
