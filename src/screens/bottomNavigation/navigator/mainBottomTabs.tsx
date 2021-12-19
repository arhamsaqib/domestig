import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../../../constants/colors';
import {PageNameText} from '../../../components/texts/pageNameText';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNav = createBottomTabNavigator();

const SamplePage = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: COLORS.MAIN_SUBTEXT}}>
      <PageNameText white>HEHE</PageNameText>
    </SafeAreaView>
  );
};

const MainBottomNav = () => {
  return (
    <BottomNav.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: COLORS.MAIN_1,
        tabBarInactiveTintColor: '#666666',
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 12,
        },
        tabBarActiveBackgroundColor: COLORS.light_green,
        tabBarItemStyle: {
          //borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          height: 35,
          alignSelf: 'center',
        },

        //tabBarShowLabel: false,
        tabBarStyle: {padding: 10},
      }}>
      <BottomNav.Screen
        name="home"
        component={SamplePage}
        options={{
          title: 'Home',
          tabBarIcon: ({color, focused}) => (
            <Icon name="home-outline" color={color} size={25} />
          ),
        }}
      />
      <BottomNav.Screen
        name="services"
        component={SamplePage}
        options={{
          title: 'Services',
          tabBarIcon: ({color, focused}) => (
            <Icon name="apps-outline" color={color} size={25} />
          ),
        }}
      />
      <BottomNav.Screen
        name="history"
        component={SamplePage}
        options={{
          title: 'History',
          tabBarIcon: ({color, focused}) => (
            <Icon name="time-outline" color={color} size={25} />
          ),
        }}
      />
      <BottomNav.Screen
        name="menu"
        component={SamplePage}
        options={{
          title: 'Menu',
          tabBarIcon: ({color, focused}) => (
            <Icon name="menu-outline" color={color} size={25} />
          ),
        }}
      />
    </BottomNav.Navigator>
  );
};

export default MainBottomNav;
