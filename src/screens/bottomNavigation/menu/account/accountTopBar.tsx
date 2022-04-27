import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Avatar} from '../../../../components/avatar';
import {COLORS} from '../../../../constants/colors';
import {ProfileDetails} from './details';
import {Reviews} from './reviews';
import {FONTS} from '../../../../constants/fonts';
import {ICONS} from '../../../../constants/icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackIcon} from '../../../../components/backIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getCustomerById, updateCustomer} from '../../../../api/customer';
import {MEDIA_URL} from '../../../../constants/url';
import ImageCropPicker from 'react-native-image-crop-picker';
import {uploadImage} from '../../../../api/uploadImage';
import auth from '@react-native-firebase/auth';

//@ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
const TobTabs = createMaterialTopTabNavigator();

export const AccountTopBar = ({navigation}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  const [loader, setLoader] = useState(false);
  const [fileUri, setFileUri]: any = useState(null);
  const [customer, setCustomer]: any = useState([]);
  async function onImagePick() {
    let result: any = await ImageCropPicker.openPicker({
      compressImageQuality: 0.5,
    });
    // console.log(result, 'Image picked');
    if (!result.cancelled) {
      setFileUri(result.path.toString());
    }
    setLoader(true);
    const res: any = await uploadImage(result);
    console.log(res, 'upload res 1');
    if (res.id !== undefined) {
      const up = await updateCustomer(state.id, {avatar: res.uri}).finally(() =>
        setLoader(false),
      );
    }
  }
  async function getData() {
    setLoader(true);
    const res = await getCustomerById(state.id).finally(() => setLoader(false));
    if (res !== undefined) {
      if (res.avatar.length > 1) setFileUri(MEDIA_URL + res.avatar);
    }
    setCustomer(res);
  }
  useEffect(() => {
    getData();
  }, []);

  async function onLogout() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('authStack');
      });
  }

  const Comp1 = () => {
    return (
      <View style={styles.card}>
        <SafeAreaView
          style={{width: '90%', alignItems: 'center', alignSelf: 'center'}}>
          <View style={styles.row}>
            <BackIcon black onPress={() => navigation.goBack()} />
            <TouchableOpacity
              onPress={onLogout}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="log-out-outline"
                size={20}
                color={COLORS.MAIN_SUBTEXT}
              />
              <Text style={[styles.log, {marginLeft: 5}]}>Log-out</Text>
            </TouchableOpacity>
          </View>
          <View style={{marginVertical: 20}} />
          <Avatar
            customSize
            size={110}
            upload
            pressable
            onPress={onImagePick}
            source={fileUri && {uri: fileUri}}
          />
          <Text style={[styles.name, {marginVertical: 3}]}>
            {customer.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={ICONS.rating}
              style={[styles.rating, {marginRight: 5}]}
            />
            <Text style={styles.ratingTxt}>
              {parseFloat(customer.rating).toFixed(1)} out of 5
            </Text>
          </View>
          {loader && <ActivityIndicator color={COLORS.MAIN_1} />}
        </SafeAreaView>
      </View>
    );
  };
  var width = Dimensions.get('screen').width;
  var height = Dimensions.get('screen').height;
  return (
    <>
      {/* <View style={{flex: 1}}> */}
      <KeyboardAwareScrollView style={{flex: 0}}>
        <Comp1 />

        <View
          style={{
            height: height + height / 3,
          }}>
          <TobTabs.Navigator
            overScrollMode="always"
            screenOptions={{
              tabBarActiveTintColor: COLORS.MAIN_2,
              tabBarInactiveTintColor: COLORS.MAIN_SUBTEXT,
              tabBarLabelStyle: styles.label,
              tabBarIndicatorStyle: {
                borderColor: COLORS.MAIN_2,
                borderWidth: 1,
              },
            }}>
            <TobTabs.Screen
              name="profileDetails"
              component={ProfileDetails}
              options={{
                title: 'Profile Details',
              }}
            />
            <TobTabs.Screen
              name="profileReviews"
              component={Reviews}
              options={{title: 'Reviews'}}
            />
          </TobTabs.Navigator>
        </View>
      </KeyboardAwareScrollView>
      {/* </View> */}
    </>
  );
};
const styles = StyleSheet.create({
  name: {
    fontFamily: FONTS.P_SEMIBOLD,
    fontSize: 20,
    color: COLORS.WF_TITLE,
  },
  label: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
  },
  rating: {
    height: 12,
    width: 12,
  },
  ratingTxt: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 10,
    color: COLORS.MAIN_TEXT,
    opacity: 0.42,
  },
  card: {
    backgroundColor: '#eff4eb',
    width: '100%',
    alignItems: 'center',
    height: 304,
    //flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  log: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 12,
    color: COLORS.MAIN_SUBTEXT,
  },
});
