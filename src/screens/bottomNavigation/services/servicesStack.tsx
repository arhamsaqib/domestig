import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ServicesMain} from './servicesMain';
import {ServicesSubcategory} from './servicesSubcategory';
import {SelectProviders} from './selectProviders';
import {ConfirmBooking} from './confirmBooking';

const Stack = createNativeStackNavigator();

export const ServicesStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="servicesMain" component={ServicesMain} />
      <Stack.Screen name="servicesSub" component={ServicesSubcategory} />
      <Stack.Screen name="selectProviders" component={SelectProviders} />
      <Stack.Screen name="confirmBooking" component={ConfirmBooking} />
    </Stack.Navigator>
  );
};
