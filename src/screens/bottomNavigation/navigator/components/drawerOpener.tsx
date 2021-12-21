import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../../../constants/fonts';
import {Drawer} from './drawer';
import {DrawerModal} from './drawerModal';

export const DrawerOpener = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <TouchableOpacity onPress={() => setIsOpen(!isOpen)} style={styles.main}>
        <Icon name="menu-outline" color={'#666666'} size={25} />
        <Text style={styles.tabBarLabelStyle}>Menu</Text>
      </TouchableOpacity>
      <DrawerModal
        modalVisibility={isOpen}
        onOutsidePress={() => setIsOpen(false)}>
        <Drawer />
      </DrawerModal>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    width: '25%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  tabBarLabelStyle: {
    fontFamily: FONTS.P_MEDIUM,
    fontSize: 12,
    marginLeft: 10,
    color: '#666666',
  },
});
