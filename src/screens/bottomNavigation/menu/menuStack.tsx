import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainMenu} from './main';
import {Notification} from './notifications';

const Stack = createNativeStackNavigator();

export const MenuStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="menu" component={MainMenu} />
      <Stack.Screen name="notifications" component={Notification} />
    </Stack.Navigator>
  );
};
