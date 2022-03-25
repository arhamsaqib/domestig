import React, {useState} from 'react';
import {StyleProp, StyleSheet, TextInput, View, ViewStyle} from 'react-native';
import {PageNameText} from './texts/pageNameText';

interface Props {
  style?: StyleProp<ViewStyle>;
  time?(time?: string): void;
}

export const TimeInput = (props: Props) => {
  const [hour, setHour] = useState('');
  const [mins, setMins] = useState('');

  function onHOurChange(h: string) {
    setHour('0');
    const hr = parseInt(h);
    if (hr >= 1 && hr <= 12) {
      setHour(hr.toString());
      props.time && props.time(hr.toString() + ':' + mins);
    }
  }
  function onMinsChange(h: string) {
    setMins('0');
    const hr = parseInt(h);
    if (hr >= 1 && hr <= 59) {
      setMins(hr.toString());
      props.time && props.time(hour + ':' + hr.toString());
    }
  }

  return (
    <View style={[styles.main, props.style]}>
      <TextInput
        style={{width: '40%', textAlign: 'center'}}
        maxLength={2}
        keyboardType="numeric"
        value={hour}
        onChangeText={onHOurChange}
      />
      <PageNameText style={{width: '20%'}}>:</PageNameText>
      <TextInput
        style={{width: '40%', textAlign: 'left'}}
        maxLength={2}
        value={mins}
        keyboardType="numeric"
        onChangeText={onMinsChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 45,
    borderWidth: 1,
    borderRadius: 99,
    // padding: 10,
    borderColor: '#BCBCBC',
    // fontFamily: FONTS.P_REGULAR,
    // fontSize: 15,
    // color: COLORS.MAIN_TEXT,
    //width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
