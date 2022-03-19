import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {ProviderCardReviews} from './components/providerReviews';
import Icon from 'react-native-vector-icons/Ionicons';
import {getProviderReviews} from '../../../../api/providerReview';

export const ProviderReviews = ({route}: any) => {
  console.log(route.params);
  const [reviews, setReviews]: any = useState([]);
  async function getData() {
    const res = await getProviderReviews(route.params.provider.id);
    if (res !== undefined) {
      setReviews(res);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  function renderReviews({item}: any) {
    return <ProviderCardReviews item={item} />;
  }
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
        <FlatList data={reviews} renderItem={renderReviews} />
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
