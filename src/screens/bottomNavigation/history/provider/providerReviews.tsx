import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {Review} from './components/review';
import Icon from 'react-native-vector-icons/Ionicons';

export const ProviderReviews = () => {
  return (
    <View style={CommonStyles.screenMain}>
      <View style={{width: '90%', marginTop: 10}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={[styles.title, {marginBottom: 10}]}>All Reviews</Text>
          <Icon name="filter-outline" size={15} onPress={() => {}} />
        </View>
        <Review />
        <Review />
        <Review />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
});
