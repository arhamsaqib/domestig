import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainMenu} from './main';
import {Notification} from './notifications';
import {Chat} from './chat';
import {HistoryDetails} from '../history/historyDetails';
import {ServicesSubcategory} from '../services/servicesSubcategory';

const Stack = createNativeStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="menu" component={MainMenu} />
      <Stack.Screen name="notifications" component={Notification} />
      <Stack.Screen name="historyDetails" component={HistoryDetails} />
      <Stack.Screen name="servicesSub" component={ServicesSubcategory} />
    </Stack.Navigator>
  );
};
