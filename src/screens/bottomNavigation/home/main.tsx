import React, {useEffect, useState} from 'react';
import {FlatList, Linking, StyleSheet, Text, View} from 'react-native';
import {getAllServices} from '../../../api/categories';
import {CommonStyles} from '../../../common/styles';
import {Banner} from '../../../components/banner';
import {HeadCard} from '../../../components/headCard';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';
import {CategoryCard} from './components/categoryCard';
import {RecommendedCard} from './components/recommendedCard';
import {getCustomerById} from '../../../api/customer';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getCustomerNotificationsCount} from '../../../api/customerNotifications';
import {ProviderAcceptModal} from './components/providerAcceptModal';
import {CancelVerificationModal} from './components/cancelVerificaitionModal';
import {VerificationCodeModal} from './components/verificationCodeModal';
import {ProviderWorkingModal} from './components/providerWorkingModal';
import {getCustomerActiveBookings} from '../../../api/customerActiveBookings';
import {showProviderWithId} from '../../../api/provider';
import {showBookingSubmission} from '../../../api/bookingSubmission';
import {useFocusEffect} from '@react-navigation/native';
import {BannerPopup} from './components/bannerPopup';
import {viewAllBanners} from '../../../api/banners';
import {updateBooking} from '../../../api/bookings';

export const MainMenu = ({navigation}: any) => {
  const [loader, setLoader] = useState(false);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  const [services, setServices]: any = useState([]);
  const [customer, setCustomer]: any = useState([]);
  const [provider, setProvider]: any = useState([]);
  const [booking, setBooking]: any = useState([]);
  const [bookingSubmisstion, setBookingSubmission]: any = useState([]);
  const [notifCount, setNotifCount]: any = useState([]);

  const [providerWaitingModal, setProviderWaitingModal] = useState(false);
  const [verificationCodeModal, setVerificationCodeModal] = useState(false);
  const [workingModal, setWorkingModal] = useState(false);

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
    const pendingdata = {
      customer_id: state.id,
      status: 'pending',
    };
    const bkn = await getCustomerActiveBookings(pendingdata);
    if (bkn.id !== undefined) {
      setBooking(bkn);
      setProviderWaitingModal(true);
    }
    const inProgressData = {
      customer_id: state.id,
      status: 'in-progress',
    };
    const bkninp = await getCustomerActiveBookings(inProgressData);
    if (bkninp.id !== undefined) {
      setBooking(bkninp);
      if (bkninp.verified !== 'true') {
        setVerificationCodeModal(true);
      } else {
        setWorkingModal(true);
      }
    }
    if (bkninp.provider_id !== undefined) {
      const prv = await showProviderWithId(bkninp.provider_id);
      if (prv.id !== undefined) {
        setProvider(prv);
      }
      const sub = await showBookingSubmission(bkninp.id);
      if (sub !== undefined) {
        setBookingSubmission(sub);
      }
    }
  }
  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const unsubscribe: any = () => getData();

      return () => unsubscribe();
    }, []),
  );

  async function onCancelBooking() {
    const data = {
      status: 'cancelled',
    };
    const res = await updateBooking(booking.id, data);
    console.log(res);
    setProviderWaitingModal(false);
    getData();
  }

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
    <>
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
      <ProviderAcceptModal
        modalVisibility={providerWaitingModal}
        onCheckBooking={() => {
          setProviderWaitingModal(false);
          navigation.navigate('historyDetails', {details: booking});
        }}
        onCancelPress={onCancelBooking}
      />
      <CancelVerificationModal modalVisibility={false} />
      <VerificationCodeModal
        modalVisibility={verificationCodeModal}
        code={booking.verification_code}
      />
      <ProviderWorkingModal
        modalVisibility={workingModal}
        provider={provider}
        submissionData={bookingSubmisstion}
        status={booking.status}
        onMessagePress={() => {
          setWorkingModal(false);
          navigation.navigate('chat', {
            booking_id: booking.id,
            provider_id: provider.id,
            customer_id: state.id,
            provider_details: provider,
          });
        }}
        onPhonePress={() => Linking.openURL(`tel:${provider.phone}`)}
      />
    </>
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
