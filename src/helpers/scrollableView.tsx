import React from 'react';
import {ScrollView, StyleProp, View, ViewStyle} from 'react-native';

interface Props {
  children?: any;
  style?: StyleProp<ViewStyle>;
}

export const ScrollableView = (props: Props) => {
  const {children} = props;
  return (
    <ScrollView style={[{width: '100%'}, props.style]}>
      <View style={{width: '100%', alignItems: 'center'}}>{children}</View>
    </ScrollView>
  );
};
