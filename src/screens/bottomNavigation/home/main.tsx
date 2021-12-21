import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {CommonStyles} from '../../../common/styles';
import {Banner} from '../../../components/banner';
import {GreenCircle} from '../../../components/greenCircle';
import {HeadCard} from '../../../components/headCard';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';
import {ScrollableView} from '../../../helpers/scrollableView';
import {CategoryCard} from './components/categoryCard';
import {RecommendedCard} from './components/recommendedCard';

export const MainMenu = ({navigation}: any) => {
  const data = [
    {name: 'Cat-1'},
    {name: 'Cat-2'},
    {name: 'Cat-3'},
    {name: 'Cat-4'},
    {name: 'Cat-5'},
    {name: 'Cat-6'},
    {name: 'Cat-7'},
    {name: 'Cat-8'},
  ];
  const renderServices = ({item}: any) => {
    return <CategoryCard name={item.name} style={{width: '25%'}} />;
  };
  const RenderFooter = () => {
    return (
      <>
        <View
          style={{
            width: '90%',
            marginTop: 20,
            alignItems: 'center',
            height: 95,
            alignSelf: 'center',
          }}>
          <Banner />
        </View>
        <View style={{width: '90%', marginTop: 20, alignSelf: 'center'}}>
          <Text style={[styles.subtext, {marginBottom: 5}]}>Recommended</Text>
          <RecommendedCard />
          <RecommendedCard />
        </View>
      </>
    );
  };
  const RenderHeader = () => {
    return (
      <>
        <HeadCard
          onNotificationPress={() => navigation.navigate('notifications')}
        />
        <View style={{width: '90%', alignSelf: 'center'}}>
          <Text style={[styles.subtext, {marginBottom: 5}]}>Category</Text>
        </View>
      </>
    );
  };
  return (
    <View style={CommonStyles.screenMain}>
      <View style={{width: '100%', marginBottom: '5%'}}>
        <FlatList
          style={styles.servicesView}
          ListHeaderComponent={RenderHeader}
          numColumns={4}
          renderItem={renderServices}
          data={data}
          ListFooterComponent={RenderFooter}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subtext: {
    fontFamily: FONTS.P_MEDIUM,
    fontSize: 17,
    color: COLORS.WF_TITLE,
  },
  servicesView: {
    //justifyContent: 'space-between',
  },
});
