import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import {BottomSheet} from '../../components/bottomSheet';
import {MyTextInputWithIcon} from '../../components/textinputwithicon';
import {FieldNameText} from '../../components/texts/fieldNameText';
import {PageNameText} from '../../components/texts/pageNameText';
import {TitleText} from '../../components/texts/titleText';
import {GradientWrapper} from '../../helpers/gradientWrapper';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/colors';
import {MyButton} from '../../components/button';
import {CommonStyles} from '../../common/styles';
import {CheckBox} from '../../components/checkbox';
import {MainBodyText} from '../../components/texts/mainBodyText';
import {DividerP} from '../../components/dividerp';
import {ScrollableView} from '../../helpers/scrollableView';
import {CheckSameString} from '../../helpers/checkSameString';
import auth from '@react-native-firebase/auth';
import {createCustomer} from '../../api/customer';
import updateCurrentUserAction from '../../redux/action/currectUserAction';
import {useStore} from 'react-redux';
import {CountriesOptions} from '../../components/countriesOption';
import {MultipleOptions} from '../../components/multipleOptions';
import {
  findPlaceById,
  findPlaceByText,
  placeAutocomplete,
} from '../../api/places';
import {KEYBOARD_PADDING} from '../../constants/keyboardPadding';
import Toast from 'react-native-toast-message';
import {createStripeCustomer} from '../../api/stripe/stripeCustomer';

export const Signup = ({navigation}: any) => {
  const [name, setName]: any = useState('');
  const [email, setEmail]: any = useState('');
  const [phone, setPhone]: any = useState('');
  const [country, setCountry]: any = useState('');
  const [location, setLocation]: any = useState('');
  const [password, setPassword]: any = useState('');
  const [error, setError]: any = useState('');
  const [loader, setLoader] = useState(false);
  const [confirmPassword, setConfirmPassword]: any = useState('');
  const [place, setPlace]: any = useState('');
  const [placeIinfo, setPlaceInfo]: any = useState([]);
  const [showPlaces, setShowPlaces] = useState(false);
  const [showCountries, setShowCountries] = useState(false);
  const store = useStore();

  function disabled() {
    return (
      email.length < 8 ||
      password.length < 8 ||
      confirmPassword.length < 8 ||
      name.length < 2
    );
  }

  async function createLaravelUser(uid: string) {
    // Creating User stripe account start
    const stripeUser = {
      name: name.trim(),
      email: email.trim(),
      address: location,
      description: 'customer',
    };

    const stripeResposne = await createStripeCustomer(stripeUser);
    console.log(stripeResposne, 'Stripe');

    const data = {
      name: name.trim(),
      email: email.trim(),
      fuid: uid,
      status: 'active',
      // location: location,
      // latitude: placeIinfo.geometry.location.lat,
      // longitude: placeIinfo.geometry.location.lng,
      location: '456 Westwood Drive, Virginia',
      latitude: '32.161671',
      longitude: '74.188309',
      phone: phone.trim(),
      country: country,
      stripeId: stripeResposne.id,
    };
    const user = await createCustomer(data).finally(() => {
      setLoader(false);
    });
    console.log(user, 'New User');

    if (user.id !== undefined) {
      store.dispatch(
        updateCurrentUserAction({
          id: user.id,
        }),
      );
      navigation.navigate('mainBottomNav');

      //   Toast.show({
      //     type: 'success',
      //     text1: 'Registration',
      //     text2: 'Account created successfully 👋',
      //   });
    }
  }
  async function onRegister() {
    setLoader(true);
    setError('');
    if (CheckSameString(password, confirmPassword)) {
      auth()
        .createUserWithEmailAndPassword(email.trim(), password)
        .then(userCredential => {
          const uid = userCredential.user.uid;
          userCredential.user.sendEmailVerification();
          createLaravelUser(uid);
        })
        .catch((error: any) => {
          console.log(error, 'error');
          setLoader(false);
          if (error.code === 'auth/email-already-in-use') {
            setLoader(false);
            setError('That email address is already in use!');
            Toast.show({
              type: 'error',
              text1: 'Register',
              text2: 'Email already in use',
            });
          }
          if (error.code === 'auth/invalid-email') {
            setLoader(false);
            setError('That email address is invalid!');
            Toast.show({
              type: 'error',
              text1: 'Register',
              text2: 'Invalid email address',
            });
          }
          if (error.code === 'auth/email-already-in-use') {
            setLoader(false);
            setError('That email address is invalid!');
            Toast.show({
              type: 'error',
              text1: 'Register',
              text2: 'Email already in use',
            });
          }
          //console.error(error);
        });
    } else {
      setLoader(false);
      setError('Passwords do not match');
    }
  }
  async function findLocation(str: string) {
    const res = await placeAutocomplete(str);
    setPlace(res);
  }

  async function findPlace(place: string) {
    const res = await findPlaceById(place);
    console.log(res, 'Place by text');

    setPlaceInfo(res.result);
  }

  function onSelect(item: any) {
    //console.log(item, 'Selected Item');
    setLocation(item.description);
    setShowPlaces(false);
    findPlace(item.place_id);
  }
  return (
    <>
      <GradientWrapper>
        <SafeAreaView style={styles.heading}>
          <PageNameText style={{marginVertical: 20}} white>
            Getting Started
          </PageNameText>
        </SafeAreaView>
        <BottomSheet style={{marginTop: '5%'}}>
          {/* <ScrollableView> */}
          <View style={{width: '90%', marginVertical: 20}}>
            <TitleText>Sign up with</TitleText>
          </View>
          <View style={{width: '90%', marginBottom: 20}}>
            <FieldNameText style={{marginBottom: 5}}>Name</FieldNameText>
            <MyTextInputWithIcon
              placeholder="Enter your name"
              autoCapitalize="none"
              onChangeText={setName}
              autoCorrect={false}
              icon={
                <Icon
                  name="person-outline"
                  size={16}
                  color={COLORS.MAIN_BODYTEXT}
                />
              }
            />
          </View>
          <View style={{width: '90%', marginBottom: 20}}>
            <FieldNameText style={{marginBottom: 5}}>Email</FieldNameText>
            <MyTextInputWithIcon
              placeholder="Enter your email"
              onChangeText={setEmail}
              autoCapitalize="none"
              icon={
                <Icon
                  name="mail-outline"
                  size={16}
                  color={COLORS.MAIN_BODYTEXT}
                />
              }
            />
          </View>
          <View style={{width: '90%', marginBottom: 20}}>
            <FieldNameText style={{marginBottom: 5}}>Phone</FieldNameText>
            <MyTextInputWithIcon
              placeholder="Enter your phone"
              onChangeText={setPhone}
              icon={
                <Icon
                  name="call-outline"
                  size={16}
                  color={COLORS.MAIN_BODYTEXT}
                />
              }
            />
          </View>
          <View style={{width: '90%', marginBottom: 20}}>
            <FieldNameText style={{marginBottom: 5}}>Password</FieldNameText>
            <MyTextInputWithIcon
              placeholder="Enter your password"
              onChangeText={setPassword}
              autoCapitalize="none"
              secureTextEntry
              icon={
                <Icon
                  name="lock-closed-outline"
                  size={16}
                  color={COLORS.MAIN_BODYTEXT}
                />
              }
            />
          </View>
          <View style={{width: '90%', marginBottom: 20}}>
            <FieldNameText style={{marginBottom: 5}}>
              Confirm Password
            </FieldNameText>
            <MyTextInputWithIcon
              placeholder="Enter confirm password"
              secureTextEntry
              autoCapitalize="none"
              onChangeText={setConfirmPassword}
              icon={
                <Icon
                  name="lock-closed-outline"
                  size={16}
                  color={COLORS.MAIN_BODYTEXT}
                />
              }
            />
          </View>
          <View style={{width: '90%', marginBottom: 20}}>
            <FieldNameText style={{marginBottom: 5}}>Country</FieldNameText>
            <MyTextInputWithIcon
              placeholder="Select your country"
              onChangeText={setCountry}
              defaultValue={country}
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
          <View style={{width: '90%', marginBottom: 300}}>
            <MyButton
              title="Sign up now"
              onPress={onRegister}
              loading={loader}
              disabled={loader || disabled()}
            />
          </View>
          {/* </ScrollableView> */}
          {/* <View
              style={[{width: '90%', alignItems: 'center', borderWidth: 1}]}>
              <FieldNameText>
                Don't have an account?{' '}
                <FieldNameText
                  onPress={() => {}}
                  style={{color: COLORS.MAIN_1, fontWeight: 'bold'}}>
                  Sign up
                </FieldNameText>
              </FieldNameText> 
            </View>*/}
        </BottomSheet>
      </GradientWrapper>
      <Toast position="bottom" />
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    width: '90%',
    //margin: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
