import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {getAllServices} from '../../../api/categories';
import {CommonStyles} from '../../../common/styles';
import {Banner} from '../../../components/banner';
import {GreenCircle} from '../../../components/greenCircle';
import {HeadCard} from '../../../components/headCard';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';
import {ScrollableView} from '../../../helpers/scrollableView';
import {CategoryCard} from './components/categoryCard';
import {RecommendedCard} from './components/recommendedCard';
import {getCustomerById} from '../../../api/customer';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getCustomerNotificationsCount} from '../../../api/customerNotifications';

export const MainMenu = ({navigation}: any) => {
  const [loader, setLoader] = useState(false);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  const [services, setServices]: any = useState([]);
  const [customer, setCustomer]: any = useState([]);
  const [notifCount, setNotifCount]: any = useState([]);
  async function getData() {
    setLoader(true);
    const res = await getAllServices().finally(() => setLoader(false));
    if (res !== undefined) {
      setServices(res);
    }
    const user = await getCustomerById(state.id);
    if (user !== undefined) {
      setCustomer(user);
    }
    const count = await getCustomerNotificationsCount(state.id);
    setNotifCount(count);
  }
  useEffect(() => {
    getData();
  }, []);
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
    return <CategoryCard name={item.categoryName} style={{width: '25%'}} />;
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
          name={customer.name}
          onNotificationPress={() => navigation.navigate('notifications')}
          notificationCount={notifCount}
          avatar={customer.avatar}
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
          data={services}
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
