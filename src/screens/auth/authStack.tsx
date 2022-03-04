import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Login} from './login';
import {Signup} from './signup';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="login" component={Login} />
      <Stack.Screen name="signup" component={Signup} />
    </Stack.Navigator>
  );
};
