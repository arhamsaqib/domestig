import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Drawer} from '../navigator/components/drawer';
import {AccountTopBar} from './account/accountTopBar';
import {Addresses} from './addresses/adresses';
import {Payment} from './payment/payment';

const Stack = createNativeStackNavigator();

export const MenuStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="drawer" component={Drawer} />
      <Stack.Screen name="userAccount" component={AccountTopBar} />
      <Stack.Screen name="addresses" component={Addresses} />
      <Stack.Screen name="payment" component={Payment} />
    </Stack.Navigator>
  );
};
