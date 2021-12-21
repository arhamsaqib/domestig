import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {BottomCard} from '../../../../../components/bottomCard';
import {GreenCircle} from '../../../../../components/greenCircle';
import {MyTextInput} from '../../../../../components/textinput';
import {MyTextInputWithIcon} from '../../../../../components/textinputwithicon';
import {COLORS} from '../../../../../constants/colors';
import {FONTS} from '../../../../../constants/fonts';
import {ICONS} from '../../../../../constants/icons';
import Icon from 'react-native-vector-icons/Ionicons';
import {MyButton} from '../../../../../components/button';

interface Props {
  modalVisibility: boolean;
  onOutsidePress?(): void;
}

export const AddAddressCard = (props: Props) => {
  return (
    <BottomCard
      modalVisibility={props.modalVisibility}
      style={{height: 413}}
      onOutsidePress={props.onOutsidePress}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <GreenCircle>
          <Image source={ICONS.location} style={styles.icon} />
        </GreenCircle>
        <Text style={[styles.title, {marginTop: 5}]}>
          Edit details and save your card for later use
        </Text>
      </View>
      <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
        <Text style={[styles.field, {marginBottom: 5}]}>Name the address</Text>
        <MyTextInput />
      </View>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
        <MyTextInputWithIcon
          icon={<Icon name="location-outline" size={15} color={'#777777'} />}
        />
      </View>
      <View style={{width: '90%', alignSelf: 'center', marginVertical: 20}}>
        <MyButton title="Save Now" />
      </View>
    </BottomCard>
  );
};

const styles = StyleSheet.create({
  icon: {
    height: 25.61,
    width: 25.61,
  },
  title: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 13,
    color: COLORS.WF_TITLE,
  },
  field: {
    fontFamily: FONTS.P_Light,
    fontSize: 14,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },
});
