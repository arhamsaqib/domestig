import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, StyleSheet, Text, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {MyTextInputWithIcon} from '../../../../components/textinputwithicon';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {DropDown} from '../../../../components/dropdown';
import {MyButton} from '../../../../components/button';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {getCustomerById, updateCustomer} from '../../../../api/customer';
import {RootStateOrAny, useSelector} from 'react-redux';
import {findPlaceByText, placeAutocomplete} from '../../../../api/places';
import {CountriesOptions} from '../../../../components/countriesOption';
import {FieldNameText} from '../../../../components/texts/fieldNameText';
import {MultipleOptions} from '../../../../components/multipleOptions';

export const ProfileDetails = () => {
  const [user, setUser]: any = useState([]);
  const [place, setPlace]: any = useState('');
  const [placeIinfo, setPlaceInfo]: any = useState([]);
  const [showPlaces, setShowPlaces] = useState(false);
  const [loader, setLoader] = useState(false);
  const [location, setLocation] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [showCountries, setShowCountries] = useState(false);
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
  async function findLocation(str: string) {
    const res = await placeAutocomplete(str);
    setPlace(res);
  }

  async function findPlace(place: string) {
    const res = await findPlaceByText(place);
    console.log(res, 'Place by text');
    if (res[0] === undefined) {
      Alert.alert('Error while parsing place');
      //setLocation('');
      setPlaceInfo(res.candidates[0]);
    } else {
      setPlaceInfo(res.candidates[0]);
    }
  }
  function onSelect(item: any) {
    //console.log(item, 'Selected Item');
    setLocation(item.description);
    setShowPlaces(false);
    findPlace(item.description);
  }
  async function onSavePress() {
    setLoader(true);
    const data = {
      location: location,
      latitude: placeIinfo.geometry.location.lat,
      longitude: placeIinfo.geometry.location.lng,
      country: country,
      phone: phone,
    };
    const res = await updateCustomer(user.id, data).finally(() =>
      setLoader(false),
    );
    console.log(res, 'update');
    getData();
  }
  return (
    <View style={CommonStyles.screenMain}>
      <ScrollableView>
        {loader && <ActivityIndicator color={COLORS.MAIN_1} />}
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
            onChangeText={setPhone}
            defaultValue={phone.length > 1 ? phone : user.phone}
            icon={<Icon name="call-outline" size={15} color={'#777777'} />}
          />
        </View>
        {/* <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Country</Text>
          <DropDown
            name={user.country ?? 'Select your country'}
            icon={<Icon name="globe-outline" size={15} color={'#777777'} />}
          />
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
          <DropDown
            name={user.location ?? 'Type your location'}
            icon={<Icon name="location-outline" size={15} color={'#777777'} />}
          />
        </View> */}
        <View style={{width: '90%', marginBottom: 20}}>
          <FieldNameText style={{marginBottom: 5}}>Country</FieldNameText>
          <MyTextInputWithIcon
            placeholder="Select your country"
            onChangeText={setCountry}
            defaultValue={country.length > 1 ? country : user.country}
            onFocus={() => setShowCountries(true)}
            autoCapitalize="none"
            icon={
              <Icon
                name="globe-outline"
                size={16}
                color={COLORS.MAIN_BODYTEXT}
              />
            }
          />
          {showCountries && (
            <CountriesOptions
              onSelect={(item: any) => {
                setCountry(item.name);
                setShowCountries(false);
              }}
              find={country}
            />
          )}
        </View>
        <View style={{width: '90%', marginBottom: 20}}>
          <FieldNameText style={{marginBottom: 5}}>Location</FieldNameText>
          <MyTextInputWithIcon
            onFocus={() => setShowPlaces(true)}
            placeholder="Enter your location"
            defaultValue={location.length > 1 ? location : user.location}
            onChangeText={findLocation}
            //value={location}
            icon={
              <Icon
                name="location-outline"
                size={16}
                color={COLORS.MAIN_BODYTEXT}
              />
            }
          />
          {showPlaces && (
            <MultipleOptions data={place.predictions} onSelect={onSelect} />
          )}
        </View>
        <View style={{width: '90%', marginTop: 20}}>
          <MyButton
            title="Save changes"
            onPress={onSavePress}
            loading={loader}
          />
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
