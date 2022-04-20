import React, {useEffect, useState} from 'react';
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
import {findPlaceByText, placeAutocomplete} from '../../../../../api/places';
import {MultipleOptions} from '../../../../../components/multipleOptions';
import {RootStateOrAny, useSelector} from 'react-redux';
import {createCustomerAddress} from '../../../../../api/customerAddresses';

interface Props {
  modalVisibility: boolean;
  onOutsidePress?(): void;
  onSavePress?(id: string, data?: any): void;
  item?: any;
}

export const UpdateAddressCard = (props: Props) => {
  const [place, setPlace]: any = useState('');
  const [name, setName]: any = useState('');
  const [placeIinfo, setPlaceInfo]: any = useState([]);
  const [showPlaces, setShowPlaces] = useState(false);
  const [loader, setLoader] = useState(false);
  const [location, setLocation]: any = useState('');

  const state = useSelector((state: RootStateOrAny) => state.currentUser);

  console.log(props.item);

  async function findLocation(str: string) {
    const res = await placeAutocomplete(str);
    res !== undefined && setPlace(res);
  }

  async function findPlace(place: string) {
    const res = await findPlaceByText(place);
    console.log(res, 'Place by text');
    if (res !== undefined) setPlaceInfo(res.candidates[0]);
  }

  function onSelect(item: any) {
    //console.log(item, 'Selected Item');
    setLocation(item.description);
    setShowPlaces(false);
    findPlace(item.description);
  }

  async function onSaveNewAddress() {
    const data = {
      name: name,
      location: location,
      latitude: placeIinfo.geometry.location.lat,
      longitude: placeIinfo.geometry.location.lng,
    };
    props.onSavePress && props.onSavePress(props.item.id, data);
  }

  // function disabled() {
  //   return name.length < 2 && false;
  // }

  return (
    <BottomCard
      modalVisibility={props.modalVisibility}
      style={[{height: 413}, showPlaces && {height: 700}]}
      onArrowPress={props.onOutsidePress}
      onOutsidePress={props.onOutsidePress}>
      <View style={{width: '100%', alignItems: 'center'}}>
        <GreenCircle>
          <Image source={ICONS.location} style={styles.icon} />
        </GreenCircle>
        <Text style={[styles.title, {marginTop: 5}]}>
          Edit details and save your addresses for later use
        </Text>
      </View>
      <View style={{width: '90%', alignSelf: 'center', marginTop: 20}}>
        <Text style={[styles.field, {marginBottom: 5}]}>Name the address</Text>
        <MyTextInput onChangeText={setName} defaultValue={props.item.name} />
      </View>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
        {/* <MyTextInputWithIcon
          icon={<Icon name="location-outline" size={15} color={'#777777'} />}
        /> */}
        <MyTextInputWithIcon
          onFocus={() => setShowPlaces(true)}
          placeholder="Enter your location"
          defaultValue={props.item.location}
          value={location.length > 1 && location}
          onChangeText={findLocation}
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
      <View style={{width: '90%', alignSelf: 'center', marginVertical: 20}}>
        <MyButton
          title="Save Now"
          onPress={onSaveNewAddress}
          loading={loader}
          disabled={loader}
        />
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
