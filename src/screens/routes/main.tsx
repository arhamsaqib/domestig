import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {SplashWhite} from '../splash/splashWhite';
import {SplashGreen} from '../splash/splashGreen';
import MainBottomNav from '../bottomNavigation/navigator/mainBottomTabs';
import {AuthStack} from '../auth/authStack';
import {OnboardingRoutes} from '../onboarding/obStack';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="splash" component={SplashGreen} />
        <Stack.Screen name="onBoardingStack" component={OnboardingRoutes} />
        <Stack.Screen name="authStack" component={AuthStack} />
        <Stack.Screen name="mainBottomNav" component={MainBottomNav} />
        <Stack.Screen name="splashWhite" component={SplashWhite} />
        {/* <Stack.Screen name="splashGreen" component={SplashGreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainStack;
