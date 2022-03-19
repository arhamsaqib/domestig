import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import {Review} from '../../history/provider/components/review';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getCustomerReviews} from '../../../../api/customerReviews';

export const Reviews = () => {
  const [reviews, setReviews]: any = useState([]);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  async function getData() {
    const res = await getCustomerReviews(state.id);
    if (res !== undefined) {
      setReviews(res);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  function renderReviews({item}: any) {
    return <Review item={item} />;
  }
  return (
    <View style={CommonStyles.screenMain}>
      <View style={[{width: '90%', marginTop: 20}, styles.row]}>
        <Text style={styles.name}>All Reviews</Text>
        <Icon name="filter-outline" size={15} onPress={() => {}} />
      </View>
      <View style={{width: '90%', marginTop: 10}}>
        <FlatList data={reviews} renderItem={renderReviews} />
      </View>
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
