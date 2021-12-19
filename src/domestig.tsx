import React from 'react';
import {SafeAreaView, View} from 'react-native';
import {MyTextInput} from './components/textinput';
import {MyTextInputWithIcon} from './components/textinputwithicon';
import Icon from 'react-native-vector-icons/Ionicons';
import {MyButton} from './components/button';
import {CheckBox} from './components/checkbox';
import {CustomSwitch} from './components/customSwitch';

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
      </View>
    </SafeAreaView>
  );
};
