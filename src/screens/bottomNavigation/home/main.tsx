import React, {useEffect, useRef, useState} from 'react';
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
import {RootStateOrAny, useSelector, useStore} from 'react-redux';
import {getCustomerNotificationsCount} from '../../../api/customerNotifications';
import {ProviderAcceptModal} from './components/providerAcceptModal';
import {CancelVerificationModal} from './components/cancelVerificaitionModal';
import {VerificationCodeModal} from './components/verificationCodeModal';
import {ProviderWorkingModal} from './components/providerWorkingModal';
import {getCustomerOpenBookings} from '../../../api/customerActiveBookings';
import {showProviderWithId} from '../../../api/provider';
import {showBookingSubmission} from '../../../api/bookingSubmission';
import {useFocusEffect} from '@react-navigation/native';
import Pusher from 'pusher-js/react-native';
import Toast from 'react-native-toast-message';

import {getBookingById, updateBooking} from '../../../api/bookings';
import {getRecommended} from '../../../api/recommended';
import {PusherConfig} from '../../../config/pusher-config';
import {ServiceOverview} from './components/overview';
import updateCurrentBookingAction from '../../../redux/action/currentbookingAction';
import {
  updatePayment,
  viewPaymentHistoryByBookingId,
} from '../../../api/paymentHistory';
import {stripeTransfer} from '../../../api/stripe/transfers';
import {createCustomerTransaction} from '../../../api/stripe/transaction';

export const MainMenu = ({navigation}: any) => {
  const [loader, setLoader] = useState(false);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  const [services, setServices]: any = useState([]);
  const [customer, setCustomer]: any = useState([]);
  const [provider, setProvider]: any = useState([]);
  const [booking, setBooking]: any = useState([]);
  const [bookingSubmisstion, setBookingSubmission]: any = useState([]);
  const [recommended, setRecommended]: any = useState([]);
  const [notifCount, setNotifCount]: any = useState([]);
  const [providerWaitingModal, setProviderWaitingModal] = useState(false);
  const [verificationCodeModal, setVerificationCodeModal] = useState(false);
  const [workingModal, setWorkingModal] = useState(false);
  const [overview, setOverview] = useState(false);
  const store = useStore();
  useEffect(() => {
    getData();
    checkPayment();
  }, []);

  async function gd(channel: any) {
    const pusher = new Pusher(PusherConfig.key, PusherConfig);
    const chatChannel = pusher.subscribe('booking' + channel);

    chatChannel.bind('pusher:subscription_succeeded', () => {
      // (3)
      chatChannel.bind('onBookingUpdate', (data: any) => {
        // (4)
        if (data.data.refresh === 'true') {
          //getData();
          GetCustomerOpenBooking();
        }
      });
    });
  }

  const bookingState = useSelector(
    (state: RootStateOrAny) => state.currentBooking,
  );
  async function checkPayment() {
    //const bid = bookingState.id;
    // if (bid !== undefined) {
    const res = await viewPaymentHistoryByBookingId(state.id);
    console.log(res, 'Payment History');

    if (res.status === 'pending') {
      console.log('booking payment pending');
      const bk = await getBookingById(res.booking_id);
      if (bk.status === 'completed') {
        setBooking(bk);
        store.dispatch(
          updateCurrentBookingAction({
            id: bk.id,
          }),
        );
        setOverview(true);
      }
    }
    //}
  }
  //------------------------------------------------------------ Breakdown into functions ---------------------------------------------

  async function GetNotifications() {
    const count = await getCustomerNotificationsCount(state.id);
    setNotifCount(count);
  }

  async function GetBookingSubmissionData() {
    if (booking.id) {
      const sub = await showBookingSubmission(booking.id);
      if (sub !== undefined) {
        setBookingSubmission(sub);
      }
    }
  }

  async function GetAllServices() {
    const res = await getAllServices().finally(() => setLoader(false));
    if (res !== undefined) {
      setServices(res);
    }
  }

  async function GetCustomer() {
    const user = await getCustomerById(state.id);
    if (user !== undefined) {
      setCustomer(user);
      return user;
    }
    return [];
  }

  async function GetCustomerOpenBooking() {
    setProviderWaitingModal(false);
    setVerificationCodeModal(false);
    setWorkingModal(false);
    const res = await getCustomerOpenBookings(state.id);
    console.log(res, 'open booking rn');
    if (res.id !== undefined && res.status !== 'completed') {
      gd(res.id);
      setBooking(res);

      if (res.status === 'pending') {
        console.log('provider waiting');

        setProviderWaitingModal(true);
      }
      if (res.status === 'in-progress') {
        if (res.verified !== 'true') {
          setVerificationCodeModal(true);
        } else {
          setWorkingModal(true);
        }
        if (res.provider_id !== undefined) {
          const prv = await showProviderWithId(res.provider_id);
          if (prv.id !== undefined) {
            setProvider(prv);
          }
        }
        const sub = await showBookingSubmission(res.id);
        if (sub !== undefined) {
          setBookingSubmission(sub);
        }
      }
    }
    return res;
  }
  //---------------------------------------------------------------------------------------------------------------------------------------

  async function getData() {
    setLoader(true);
    await GetAllServices();
    const user = await GetCustomer();
    const recD = {
      lat: user.latitude,
      lng: user.longitude,
    };
    await GetNotifications();
    const recom = await getRecommended(recD);
    if (recom !== undefined) {
      setRecommended(recom);
    }
    const booking = await GetCustomerOpenBooking();
  }

  async function onCompletePayment(provider: any, amount: any, booking: any) {
    const res = await stripeTransfer({
      account: provider.stripeId,
      amount: amount.toString() + '00',
      currency: 'usd',
    }).finally(() => {});
    console.log(res, 'Transfer response');

    // if (res.id) {
    if (true) {
      const bln = await createCustomerTransaction(
        {
          amount: amount.toString() + '00',
          currency: 'usd',
        },
        customer.stripeId,
      );
      console.log(bln, 'balance');
      const upd = await updatePayment(booking.id, {
        status: 'complete',
      });
      setOverview(false);
    }
    if (res.error) {
      setOverview(false);
      Toast.show({
        type: 'error',
        text1: res.error.code,
        text2: res.error.message,
      });
    }
  }

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
    setProviderWaitingModal(false);
    getData();
  }

  const renderServices = ({item}: any) => {
    return (
      <CategoryCard
        name={item.categoryName}
        style={{width: '25%'}}
        onPress={() =>
          navigation.navigate('servicesSub', {
            service: item,
            categoryName: item.categoryName,
          })
        }
      />
    );
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
          {recommended.length > 1 && (
            <Text style={[styles.subtext, {marginBottom: 5}]}>Recommended</Text>
          )}
          {/* <RecommendedCard /> */}
          {recommended.map((item: any) => {
            return (
              <RecommendedCard
                title={
                  item.booking.category_name +
                  '( ' +
                  item.booking.services +
                  ' )'
                }
                rating={item.review.stars}
                by={item.provider.name}
              />
            );
          })}
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
      <View style={[CommonStyles.screenMain, {}]}>
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
      <ServiceOverview
        provider={provider}
        submission={bookingSubmisstion}
        booking={booking}
        visibility={overview}
        onCompletePayment={onCompletePayment}
      />
      <Toast position="bottom" />
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

/*
 async function getData() {
    setLoader(true);
    setProviderWaitingModal(false);
    setVerificationCodeModal(false);
    setWorkingModal(false);
    const res = await getAllServices().finally(() => setLoader(false));
    if (res !== undefined) {
      setServices(res);
    }
    const user = await getCustomerById(state.id);
    if (user !== undefined) {
      setCustomer(user);
    }

    const recD = {
      lat: user.latitude,
      lng: user.longitude,
    };
    const recom = await getRecommended(recD);
    if (recom !== undefined) {
      setRecommended(recom);
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
      gd(bkn.id);
    }
    const inProgressData = {
      customer_id: state.id,
      status: 'in-progress',
    };
    const bkninp = await getCustomerActiveBookings(inProgressData);
    if (bkninp.id !== undefined) {
      gd(bkninp.id);

      setBooking(bkninp);
      if (bkninp.verified !== 'true') {
        setVerificationCodeModal(true);
      } else {
        setWorkingModal(true);
      }
      // store.dispatch(
      //   updateCurrentBookingAction({
      //     id: bkninp.id,
      //   }),
      //);
    }
    if (bkninp.provider_id !== undefined) {
      const prv = await showProviderWithId(bkninp.provider_id);
      if (prv.id !== undefined) {
        setProvider(prv);
      }
    }
    const sub = await showBookingSubmission(bkninp.id);
    if (sub !== undefined) {
      setBookingSubmission(sub);
    }
  }



*/
