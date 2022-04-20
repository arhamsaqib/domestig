import React, {useEffect, useState} from 'react';
import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../../../../common/styles';
import {Avatar} from '../../../../components/avatar';
import {Divider} from '../../../../components/divider';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {ICONS} from '../../../../constants/icons';
import {DrawerOption} from './drawerOption';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getCustomerById} from '../../../../api/customer';
import {MEDIA_URL} from '../../../../constants/url';
import {useNavigation} from '@react-navigation/native';

export const Drawer = ({navigation, onClose}: any) => {
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  const [user, setUser]: any = useState([]);
  async function getData() {
    const usr = await getCustomerById(state.id);
    if (usr !== undefined) {
      setUser(usr);
    }
  }
  //const navigation: any = useNavigation();
  useEffect(() => {
    getData();
  }, []);

  function onPress(screen: string) {
    navigation.navigate('menu', {screen: screen});
  }

  const options = [
    {
      name: 'Home',
      iconName: 'home-outline',
      onPress: () => {
        navigation.navigate('home');
        onClose();
      },
    },
    {
      name: 'History',
      iconName: 'time-outline',
      onPress: () => {
        navigation.navigate('history');
        onClose();
      },
    },
    {
      name: 'Notification',
      iconName: 'notifications-outline',
      onPress: () => {
        navigation.navigate('notifications');
        onClose();
      },
    },
    {
      name: 'My account',
      iconName: 'person-outline',
      onPress: () => {
        navigation.navigate('menu', {screen: 'userAccount'});
        onClose();
      },
    },
    {
      name: 'Addresses',
      iconName: 'location-outline',
      // onPress: () => navigation.navigate('addresses'),
      onPress: () => {
        navigation.navigate('menu', {screen: 'userAccount'});
        onClose();
      },
    },
    {
      name: 'Payment',
      iconName: 'card-outline',
      // onPress: () => navigation.navigate('payment'),
      onPress: () => {
        navigation.navigate('menu', {screen: 'payment'});
        onClose();
      },
    },
    {
      name: 'Wallet',
      iconName: 'wallet-outline',
      // onPress: () => navigation.navigate('wallet'),
      onPress: () => {
        navigation.navigate('menu', {screen: 'wallet'});
        onClose();
      },
    },
    {
      name: 'Language',
      iconName: 'globe-outline',
      //  onPress: () => navigation.navigate('language'),
      onPress: () => {
        navigation.navigate('menu', {screen: 'language'});
        onClose();
      },
    },
    {
      name: 'Share & Discount',
      iconName: 'share-social',
      //onPress: () => navigation.navigate('referrals'),
      onPress: () => {
        navigation.navigate('menu', {screen: 'referrals'});
        onClose();
      },
    },
    {
      name: 'Terms & Conditions',
      iconName: 'book-outline',
      //onPress: () => navigation.navigate('tos'),
      onPress: () => {
        navigation.navigate('menu', {screen: 'tos'});
        onClose();
      },
    },
    {
      name: 'Privacy Policy',
      iconName: 'book-outline',
      //onPress: () => navigation.navigate('privacyPolicy'),
      onPress: () => {
        navigation.navigate('menu', {screen: 'privacyPolicy'});
        onClose();
      },
    },
  ];

  const renderOptions = (item: any) => {
    return (
      <DrawerOption
        name={item.name}
        iconName={item.iconName}
        onPress={item.onPress}
      />
    );
  };

  return (
    // <View style={{flex: 1, flexDirection: 'row'}}>
    //  <View style={{width: '20%', backgroundColor: COLORS.WF2}} />
    <SafeAreaView style={[styles.main, styles.elevated_card]}>
      <Avatar
        customSize
        size={70}
        source={user.avatar && {uri: MEDIA_URL + user.avatar}}
      />
      <Text style={[styles.name, {marginVertical: 10}]}>{user.name}</Text>
      <View style={styles.ratingCont}>
        <Image
          style={[styles.rating, {marginRight: 5}]}
          source={ICONS.rating}
        />
        <Text style={styles.ratingTxt}>{parseFloat(user.rating)} out of 5</Text>
      </View>
      <Divider />
      <ScrollableView>
        <View style={{width: '80%', marginTop: 10}}>
          {options.map(renderOptions)}
        </View>
        <View style={{width: '80%', marginTop: 20}}>
          <DrawerOption name="Log-out" iconName="log-out-outline" />
        </View>
      </ScrollableView>
    </SafeAreaView>
    // </View>
  );
};

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
    height: '100%',
  },
  // main: {
  //   //flex: 1,
  //   alignItems: 'center',
  //   width: '80%',
  //   alignSelf: 'flex-end',
  // },
  name: {
    fontFamily: FONTS.P_SEMIBOLD,
    fontSize: 20,
    color: COLORS.WF_TITLE,
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
  ratingCont: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'center',
    marginBottom: 10,
  },
  elevated_card: {
    //padding: 10,
    elevation: 1,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: 'white',
    //borderRadius: 10,
    //marginVertical: 10,
    height: '100%',
  },
});
