import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {CustomSwitch} from '../../../../../components/customSwitch';
import {GreenCircle} from '../../../../../components/greenCircle';
import {COLORS} from '../../../../../constants/colors';
import {FONTS} from '../../../../../constants/fonts';
import {ICONS} from '../../../../../constants/icons';

interface Props {
  icon?: any;
  switch?: boolean;
  name?: string;
  default?: boolean;
  editable?: boolean;
}

export const PaymentCard = (props: Props) => {
  return (
    <View style={styles.main}>
      <View style={styles.row1}>
        <GreenCircle s41>{props.icon}</GreenCircle>
        <Text style={styles.name}>{props.name ?? 'Card'}</Text>
      </View>
      <View style={styles.row1}>
        {props.switch && <CustomSwitch />}
        {props.editable && (
          <Image
            source={ICONS.pencil}
            style={[styles.pencil, {marginLeft: 5}]}
          />
        )}
        {props.default && <Text style={styles.def}>{'Default'}</Text>}
      </View>
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
  def: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },
  pencil: {
    height: 15,
    width: 15,
  },
});
