import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {PageNameText} from '../../../../components/texts/pageNameText';
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
import {ScrollableView} from '../../../../helpers/scrollableView';
import {ScrollView} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

const TobTabs = createMaterialTopTabNavigator();

export const AccountTopBar = ({navigation}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  const [loader, setLoader] = useState(false);
  const [fileUri, setFileUri]: any = useState(null);
  const [customer, setCustomer]: any = useState([]);
  async function onImagePick() {
    let result: any = await ImageCropPicker.openPicker({});
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

  const Comp1 = () => {
    return (
      <View style={styles.card}>
        <SafeAreaView
          style={{width: '90%', alignItems: 'center', alignSelf: 'center'}}>
          <View style={styles.row}>
            <BackIcon black onPress={() => navigation.goBack()} />
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Icon
                name="log-out-outline"
                size={20}
                color={COLORS.MAIN_SUBTEXT}
              />
              <Text style={[styles.log, {marginLeft: 5}]}>Log-out</Text>
            </View>
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

  return (
    <>
      <Comp1 />
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
