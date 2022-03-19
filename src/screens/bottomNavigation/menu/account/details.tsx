import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {MyTextInputWithIcon} from '../../../../components/textinputwithicon';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {DropDown} from '../../../../components/dropdown';
import {MyButton} from '../../../../components/button';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {getCustomerById} from '../../../../api/customer';
import {RootStateOrAny, useSelector} from 'react-redux';

export const ProfileDetails = () => {
  const [user, setUser]: any = useState([]);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  async function getData() {
    const res = await getCustomerById(state.id);
    if (res !== undefined) {
      setUser(res);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={CommonStyles.screenMain}>
      <ScrollableView>
        <View style={{width: '90%', marginTop: 20}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Name</Text>
          <MyTextInputWithIcon
            defaultValue={user.name}
            editable={false}
            icon={<Icon name="person-outline" size={15} color={'#777777'} />}
          />
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Email</Text>
          <MyTextInputWithIcon
            editable={false}
            defaultValue={user.email}
            icon={<Icon name="mail-outline" size={15} color={'#777777'} />}
          />
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Phone</Text>
          <MyTextInputWithIcon
            defaultValue={user.phone}
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
