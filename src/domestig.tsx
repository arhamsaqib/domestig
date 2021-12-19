import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {MyTextInput} from './components/textinput';
import {MyTextInputWithIcon} from './components/textinputwithicon';
import Icon from 'react-native-vector-icons/Ionicons';
import {MyButton} from './components/button';
import {CheckBox} from './components/checkbox';
import {CustomSwitch} from './components/customSwitch';
import {Avatar} from './components/avatar';

export const Domestig = () => {
  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View style={{width: '90%'}}>
        <MyTextInputWithIcon
          placeholder="Enter Name"
          secureTextEntry
          icon={<Icon name="eye-outline" size={15} />}
        />
        <MyTextInput placeholder="Enter Name" secureTextEntry />
        <MyButton />
        <MyButton secondary />
        <CheckBox />
        <CustomSwitch onToggle={() => {}} />
        <Avatar verified />
        <Avatar upload size={120} customSize />
      </View>
    </SafeAreaView>
  );
};
