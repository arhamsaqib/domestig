import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Drawer} from '../navigator/components/drawer';
import {AccountTopBar} from './account/accountTopBar';
import {Addresses} from './addresses/adresses';
import {Payment} from './payment/payment';
import {Wallet} from './wallet/wallet';
import {Language} from './language/language';
import {Referrals} from './sharendiscount/referrals';
import {TOS} from './tos/tos';
import {PrivacyPolicy} from './privacypolicy/policy';

const Stack = createNativeStackNavigator();

export const MenuStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="drawer" component={Drawer} />
      <Stack.Screen name="userAccount" component={AccountTopBar} />
      <Stack.Screen name="addresses" component={Addresses} />
      <Stack.Screen name="payment" component={Payment} />
      <Stack.Screen name="wallet" component={Wallet} />
      <Stack.Screen name="language" component={Language} />
      <Stack.Screen name="referrals" component={Referrals} />
      <Stack.Screen name="tos" component={TOS} />
      <Stack.Screen name="privacyPolicy" component={PrivacyPolicy} />
    </Stack.Navigator>
  );
};
