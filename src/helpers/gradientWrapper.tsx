import React from 'react';
import {ScrollView, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../constants/colors';

interface Props {
  children?: any;
  style?: StyleProp<ViewStyle>;
}

export const GradientWrapper = (props: Props) => {
  const {children} = props;
  return (
    <LinearGradient colors={[COLORS.MAIN_1, COLORS.WHITE]} style={styles.main}>
      {children}
      {/* <ScrollView style={[{width: '100%'}, props.style]}>
        <View style={{width: '100%', alignItems: 'center'}}>{children}</View>
      </ScrollView> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
});
