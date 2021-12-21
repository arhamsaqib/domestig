import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HistoryMain} from './historyMain';
import {HistoryDetails} from './historyDetails';

const Stack = createNativeStackNavigator();

export const HistoryStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="historyMain" component={HistoryMain} />
      <Stack.Screen name="historyDetails" component={HistoryDetails} />
    </Stack.Navigator>
  );
};
