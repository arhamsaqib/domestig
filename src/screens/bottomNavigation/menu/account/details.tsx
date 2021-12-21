import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {MyTextInputWithIcon} from '../../../../components/textinputwithicon';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {DropDown} from '../../../../components/dropdown';
import {MyButton} from '../../../../components/button';
import {ScrollableView} from '../../../../helpers/scrollableView';

export const ProfileDetails = () => {
  return (
    <View style={CommonStyles.screenMain}>
      <ScrollableView>
        <View style={{width: '90%', marginTop: 20}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Name</Text>
          <MyTextInputWithIcon
            icon={<Icon name="person-outline" size={15} color={'#777777'} />}
          />
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Email</Text>
          <MyTextInputWithIcon
            icon={<Icon name="mail-outline" size={15} color={'#777777'} />}
          />
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Phone</Text>
          <MyTextInputWithIcon
            icon={<Icon name="call-outline" size={15} color={'#777777'} />}
          />
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Country</Text>
          <DropDown
            name="Select your country"
            icon={<Icon name="globe-outline" size={15} color={'#777777'} />}
          />
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
          <DropDown
            name="Type your location"
            icon={<Icon name="location-outline" size={15} color={'#777777'} />}
          />
        </View>
        <View style={{width: '90%', marginTop: 20}}>
          <MyButton title="Save changes" />
        </View>
      </ScrollableView>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    fontFamily: FONTS.P_Light,
    fontSize: 14,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },
});
