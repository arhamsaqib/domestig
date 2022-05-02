import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeadCard} from '../../../components/headCard';
import {HomeStack} from '../home/homeStack';
import {HistoryStack} from '../history/historyStack';
import {ServicesStack} from '../services/servicesStack';
import {StyleSheet, Text} from 'react-native';
import {DrawerOpener} from './components/drawerOpener';
import {MenuStack} from '../menu/menuStack';
import {CustomerTabItem} from './components/customerTabItem';

const BottomNav = createBottomTabNavigator();

const Label = ({children}: any) => {
  return <Text style={styles.labelActive}>{children}</Text>;
};

const MainBottomNav = () => {
  return (
    <BottomNav.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelPosition: 'beside-icon',
        tabBarActiveTintColor: COLORS.MAIN_1,
        tabBarInactiveTintColor: '#666666',
        tabBarHideOnKeyboard: true,
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 12,
        },
        tabBarActiveBackgroundColor: COLORS.light_green,
        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          height: 35,
          alignSelf: 'center',
          alignContent: 'center',
        },
        tabBarStyle: {
          height: 83,
          justifyContent: 'center',
          alignItems: 'center',
        },
      }}>
      <BottomNav.Screen
        name="home"
        component={HomeStack}
        options={navigation => ({
          unmountOnBlur: true,
          title: 'Home',
          tabBarButton: props => (
            <CustomerTabItem
              name="Home"
              navigation={navigation}
              iconName="home-outline"
            />
          ),
        })}
      />
      <BottomNav.Screen
        name="services"
        component={ServicesStack}
        options={navigation => ({
          title: 'Services',
          tabBarButton: props => (
            <CustomerTabItem
              name="Services"
              navigation={navigation}
              iconName="apps-outline"
            />
          ),
        })}
      />
      <BottomNav.Screen
        name="history"
        component={HistoryStack}
        options={navigation => ({
          title: 'History',
          tabBarButton: props => (
            <CustomerTabItem
              name="History"
              navigation={navigation}
              //icon={<Icon name="time-outline" color={'black'} size={25} />}
              iconName="time-outline"
            />
          ),
        })}
      />
      <BottomNav.Screen
        name="menu"
        component={MenuStack}
        options={navigation => ({
          title: 'Menu',
          tabBarIcon: ({color, focused}) => (
            <Icon name="menu-outline" color={color} size={25} />
          ),
          tabBarLabel: ({focused}) => {
            return <Label>{focused && 'Menu'}</Label>;
          },
          tabBarButton: props => (
            <DrawerOpener
              navigation={navigation}
              iconName="menu-outline"
              name="Menu"
            />
          ),
          unmountOnBlur: true,
        })}
      />
    </BottomNav.Navigator>
  );
};

const styles = StyleSheet.create({
  labelActive: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: COLORS.MAIN_1,
    marginLeft: '15%',
  },
});

export default MainBottomNav;
