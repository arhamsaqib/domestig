import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {SplashWhite} from '../splash/splashWhite';
import {SplashGreen} from '../splash/splashGreen';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="splashWhite" component={SplashWhite} />
        {/* <Stack.Screen name="splashGreen" component={SplashGreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
