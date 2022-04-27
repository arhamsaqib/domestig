import React from 'react';
import {Dimensions, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../constants/colors';

interface Props {
  children?: any;
  style?: StyleProp<ViewStyle>;
}
//@ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

export const GradientWrapper = (props: Props) => {
  const {children, style} = props;
  const height = Dimensions.get('screen').height;
  return (
    <KeyboardAwareScrollView
      enableOnAndroid
      contentContainerStyle={{backgroundColor: 'white', height: height * 2}}
      style={{width: '100%', alignSelf: 'center'}}>
      <LinearGradient
        colors={[COLORS.MAIN_1, COLORS.WHITE]}
        style={[styles.main, props.style]}>
        <View style={{width: '100%', alignItems: 'center'}}>{children}</View>
      </LinearGradient>
    </KeyboardAwareScrollView>

    // <LinearGradient
    //   colors={[COLORS.MAIN_1, COLORS.WHITE]}
    //   style={[styles.main, props.style]}>
    //   <KeyboardAwareScrollView
    //     enableOnAndroid
    //     style={{width: '100%', alignSelf: 'center', flex: 1}}>
    //     <View style={{width: '100%', alignItems: 'center'}}>{children}</View>
    //   </KeyboardAwareScrollView>
    // </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
});
