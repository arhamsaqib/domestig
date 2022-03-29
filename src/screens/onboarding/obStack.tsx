import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Onboarding1} from './ob1';
import {Onboarding2} from './ob2';
import {Onboarding3} from './ob3';

const Stack = createNativeStackNavigator();

export const OnboardingRoutes = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="ob1" component={Onboarding1} />
      <Stack.Screen name="ob2" component={Onboarding2} />
      <Stack.Screen name="ob3" component={Onboarding3} />
    </Stack.Navigator>
  );
};
