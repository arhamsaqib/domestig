import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native';
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
import auth from '@react-native-firebase/auth';

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
      iconName: 'home',
      onPress: () => {
        navigation.navigate('home');
        onClose();
      },
      image: {
        source: ICONS.home,
        style: {width: 18, height: 20},
      },
    },
    {
      name: 'History',
      iconName: 'history',
      onPress: () => {
        navigation.navigate('history');
        onClose();
      },
      image: {
        source: ICONS.history,
        style: {width: 20, height: 18},
      },
    },
    {
      name: 'Notification',
      iconName: 'notifications-none',
      onPress: () => {
        navigation.navigate('notifications');
        onClose();
      },
      image: {
        source: ICONS.bell,
        style: {width: 18, height: 20},
      },
    },
    {
      name: 'My account',
      iconName: 'person-outline',
      onPress: () => {
        navigation.navigate('menu', {screen: 'userAccount'});
        onClose();
      },
      image: {
        source: ICONS.account,
        style: {width: 18, height: 20},
      },
    },
    {
      name: 'Addresses',
      iconName: 'location-outline',
      // onPress: () => navigation.navigate('addresses'),
      onPress: () => {
        navigation.navigate('menu', {screen: 'addresses'});
        onClose();
      },
      image: {
        source: ICONS.address,
        style: {width: 18, height: 20},
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
      image: {
        source: ICONS.payment,
        style: {width: 20, height: 14.17},
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
      image: {
        source: ICONS.wallet1,
        style: {width: 20, height: 19},
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
      image: {
        source: ICONS.language,
        style: {width: 20, height: 20},
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
      image: {
        source: ICONS.share,
        style: {width: 18, height: 20},
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
      image: {
        source: ICONS.book,
        style: {width: 20, height: 15},
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
      image: {
        source: ICONS.book,
        style: {width: 20, height: 15},
      },
    },
  ];

  const renderOptions = (item: any) => {
    return (
      <DrawerOption
        name={item.name}
        iconName={item.iconName}
        onPress={item.onPress}
        image={item.image}
      />
    );
  };

  async function onLogout() {
    auth()
      .signOut()
      .then(() => {
        console.log('User signed out!');
        navigation.navigate('authStack');
      });
  }
  return (
    <>
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
          <Text style={styles.ratingTxt}>
            {parseFloat(user.rating)} out of 5
          </Text>
        </View>
        <Divider />
        <ScrollableView>
          <View style={{width: '80%', marginTop: 10}}>
            {options.map(renderOptions)}
          </View>
          <View style={{width: '80%', marginTop: 20}}>
            <DrawerOption
              onPress={onLogout}
              name="Log-out"
              iconName="log-out-outline"
              image={{
                source: ICONS.logout,
                style: {width: 20, height: 18},
              }}
            />
          </View>
        </ScrollableView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
    height: '100%',
    marginTop: 15,
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
