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
import {findPlaceById, placeAutocomplete} from '../../../../../api/places';
import {MultipleOptions} from '../../../../../components/multipleOptions';
import {RootStateOrAny, useSelector} from 'react-redux';

interface Props {
  modalVisibility: boolean;
  onOutsidePress?(): void;
  onSavePress?(data?: any): void;
  loader?: boolean;
}

export const AddAddressCard = (props: Props) => {
  const [place, setPlace]: any = useState('');
  const [name, setName]: any = useState('');
  const [placeIinfo, setPlaceInfo]: any = useState([]);
  const [showPlaces, setShowPlaces] = useState(false);
  const [location, setLocation]: any = useState('');

  const state = useSelector((state: RootStateOrAny) => state.currentUser);

  async function findLocation(str: string) {
    const res = await placeAutocomplete(str);
    res !== undefined && setPlace(res);
  }

  async function findPlace(place: string) {
    const res = await findPlaceById(place);
    console.log(res, 'Place by text');
    if (res !== undefined) setPlaceInfo(res.result);
  }

  function onSelect(item: any) {
    //console.log(item, 'Selected Item');
    setLocation(item.description);
    setShowPlaces(false);
    findPlace(item.place_id);
  }

  async function onSaveNewAddress() {
    const data = {
      name: name,
      location: location,
      latitude: placeIinfo.geometry.location.lat,
      longitude: placeIinfo.geometry.location.lng,
      customer_id: state.id,
    };
    props.onSavePress && props.onSavePress(data);
  }

  function disabled() {
    return name.length < 2 || location.length < 2;
  }

  useEffect(() => {
    function clean() {
      setName('');
      setLocation('');
      setPlaceInfo([]);
    }
    return () => clean();
  }, [props.modalVisibility]);

  return (
    <BottomCard
      modalVisibility={props.modalVisibility}
      style={[{height: 413}, showPlaces && {height: 700}]}
      //style={[{height: '50%'}, showPlaces && {height: '90%'}]}
      onOutsidePress={props.onOutsidePress}
      onArrowPress={props.onOutsidePress}>
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
        <MyTextInput onChangeText={setName} />
      </View>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
        {/* <MyTextInputWithIcon
          icon={<Icon name="location-outline" size={15} color={'#777777'} />}
        /> */}
        <MyTextInputWithIcon
          onFocus={() => setShowPlaces(true)}
          onBlur={() => setShowPlaces(false)}
          placeholder="Enter your location"
          defaultValue={location}
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
          loading={props.loader}
          disabled={props.loader || disabled()}
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
