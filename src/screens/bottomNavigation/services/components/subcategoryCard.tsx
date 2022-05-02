import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {CheckMark} from '../../../../components/checkmark';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

interface Props {
  name?: string;
  hideCheckmark?: boolean;
  onPress?(): void;
}

export const SubcategoryCard = (props: Props) => {
  return (
    <TouchableOpacity disabled style={styles.main}>
      <View style={styles.row}>
        <Text style={styles.txt}>{props.name ?? 'Cat'}</Text>
        {!props.hideCheckmark && <CheckMark tick onPress={props.onPress} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    width: '100%',
    height: 50,
    borderColor: '#F2F2F2',
  },
  row: {
    height: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  txt: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
});
