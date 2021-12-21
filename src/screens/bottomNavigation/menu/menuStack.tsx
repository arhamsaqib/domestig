import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Drawer} from '../navigator/components/drawer';
import {AccountTopBar} from './account/accountTopBar';

const Stack = createNativeStackNavigator();

export const MenuStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="drawer" component={Drawer} />
      <Stack.Screen name="userAccount" component={AccountTopBar} />
    </Stack.Navigator>
  );
};
