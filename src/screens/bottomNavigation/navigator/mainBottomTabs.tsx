import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {HeadCard} from '../../../components/headCard';
import {HomeStack} from '../home/homeStack';
import {HistoryStack} from '../history/historyStack';
import {ServicesStack} from '../services/servicesStack';
import {MyButton} from '../../../components/button';
import {Alert, StyleSheet, Text} from 'react-native';
import {DrawerOpener} from './components/drawerOpener';
import {Drawer} from './components/drawer';
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
        tabBarLabelStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 12,
        },
        tabBarActiveBackgroundColor: COLORS.light_green,
        tabBarItemStyle: {
          // borderWidth: 1,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 5,
          height: 35,
          alignSelf: 'center',
          alignContent: 'center',
        },
        //tabBarShowLabel: false,
        tabBarStyle: {
          height: 100,
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
              //icon={<Icon name="home-outline" color={'black'} size={25} />}
              iconName="home-outline"
            />
          ),
          // tabBarIcon: ({color, focused}) => (
          //   <Icon name="home-outline" color={color} size={25} />
          // ),
          // tabBarLabel: ({focused}) => {
          //   return <Label>{focused && 'Home'}</Label>;
          // },
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
              //icon={<Icon name="apps-outline" color={'black'} size={25} />}
              iconName="apps-outline"
            />
          ),
          // tabBarIcon: ({color, focused}) => (
          //   <Icon name="apps-outline" color={color} size={25} />
          // ),
          // tabBarLabel: ({focused}) => {
          //   return <Label>{focused && 'Services'}</Label>;
          // },
        })}
      />
      <BottomNav.Screen
        name="history"
        component={HistoryStack}
        options={navigation => ({
          title: 'History',
          // tabBarIcon: ({color, focused}) => (
          //   <Icon name="time-outline" color={color} size={25} />
          // ),
          // tabBarLabel: ({focused}) => {
          //   return <Label>{focused && 'History'}</Label>;
          // },
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
        // component={() => {
        //   return null;
        // }}
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
