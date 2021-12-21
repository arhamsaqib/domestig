import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {Review} from '../../history/provider/components/review';
import {ScrollableView} from '../../../../helpers/scrollableView';

export const Reviews = () => {
  return (
    <View style={CommonStyles.screenMain}>
      <View style={[{width: '90%', marginTop: 20}, styles.row]}>
        <Text style={styles.name}>All Reviews</Text>
        <Icon name="filter-outline" size={15} onPress={() => {}} />
      </View>
      <ScrollableView>
        <View style={{width: '90%', marginTop: 10}}>
          <Review />
          <Review />
          <Review />
          <Review />
        </View>
      </ScrollableView>
    </View>
  );
};

const styles = StyleSheet.create({
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
  row: {
    //width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
