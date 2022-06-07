import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {BackIcon} from '../../../../components/backIcon';
import {MyButton} from '../../../../components/button';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {BalanceCard} from './components/balanceCard';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../../../constants/fonts';
import {COLORS} from '../../../../constants/colors';
import {TransactionsCard} from './components/transactionsCard';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {AddBalanceCard} from './components/addBalanceCard';
import {RootStateOrAny, useSelector} from 'react-redux';
import {findInvoices} from '../../../../api/invoice';
import {
  createCardToken,
  createStriprCustomerCard,
} from '../../../../api/stripe/card';
import {
  confirmStripePaymentIntent,
  createStripePaymentIntent,
} from '../../../../api/stripe/peymentIntent';
import {getCustomerById} from '../../../../api/customer';
import {
  createCustomerTransaction,
  getCustomerTransaction,
} from '../../../../api/stripe/transaction';
import Toast from 'react-native-toast-message';
import {getStripeCustomer} from '../../../../api/stripe/stripeCustomer';

export const Wallet = ({navigation}: any) => {
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(false);
  const [data, setData]: any = useState([]);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  const [user, setUser]: any = useState([]);
  const [sUser, setStripeUser]: any = useState([]);
  const [balance, setBalance]: any = useState();
  async function getData() {
    setLoader(true);
    const data = {
      customer_id: state.id,
    };
    // const res = await findInvoices(data).finally(() => setLoader(false));
    // if (res !== undefined) {
    //   setData(res);
    // }
    //console.log(res, 'invoices');
    const usr = await getCustomerById(state.id).finally(() => setLoader(false));
    if (usr !== undefined) {
      setUser(usr);
    }

    const transactions = await getCustomerTransaction(usr.stripeId);
    setData(transactions);

    const suser = await getStripeCustomer(usr.stripeId);
    setStripeUser(suser);
    const blnc = (parseFloat(suser.balance) * -1) / 100;
    setBalance(blnc.toString());
  }

  useEffect(() => {
    getData();
  }, []);

  // var total = 0;
  // var total1 = 0;
  // data.forEach((item: any) => {
  //   total += parseFloat(item.amount);
  // });
  // data.forEach((item: any) => {
  //   total1 += item.extra_work_charges ? parseFloat(item.extra_work_charges) : 0;
  // });

  async function onAddPayment(data: any) {
    setLoader(true);
    setShow(false);

    const amount = data.amount;
    const card = {
      number: data.number,
      expiryMonth: data.expiryMonth,
      expiryYear: data.expiryYear,
      cvc: data.cvc,
      name: data.name,
    };
    const getToken = await createCardToken(card);
    if (getToken.error) {
      Toast.show({
        type: 'error',
        text1: 'Error generating token',
        text2: getToken.error.code,
      });
    }
    const connectCardToUser = await createStriprCustomerCard(
      getToken.id,
      user.stripeId,
    );
    if (connectCardToUser.error) {
      Toast.show({
        type: 'error',
        text1: 'Error connecting card to user',
        text2: connectCardToUser.error.code,
      });
    }
    const intent = {
      amount: (parseInt(amount) * 100).toString(),
      currency: 'usd',
      payment_method_types: 'card',
      customer: user.stripeId,
      card: getToken.card.id,
    };
    console.log(intent, 'intent');
    const resPaymentIntent = await createStripePaymentIntent(intent);
    if (resPaymentIntent.error) {
      Toast.show({
        type: 'error',
        text1: 'Error Creating Intent',
        text2: resPaymentIntent.error.message,
      });
    }
    const resConfirm = await confirmStripePaymentIntent(
      resPaymentIntent.id,
    ).finally(() => {
      setLoader(false);
    });
    if (resConfirm.error) {
      Toast.show({
        type: 'error',
        text1: 'Error Confirming Intent',
        text2: resConfirm.error.code,
      });
    } else {
      const d = {
        amount: '-' + (parseInt(amount) * 100).toString(),
        currency: 'usd',
      };
      const transaction = await createCustomerTransaction(d, user.stripeId);
      // console.log(transaction, 'Transaction details');
      // }
      if (transaction.error) {
        Toast.show({
          type: 'error',
          text1: 'Error performing transaction',
          text2: transaction.error.code,
        });
      }
    }

    console.log(getToken, 'Card Token');
    console.log(connectCardToUser, 'Card TO user');
    console.log('Payment Intent response: ', resPaymentIntent);
    console.log(resConfirm, 'Confirm Payment response');
  }

  // async function mt() {
  //   const d = {
  //     amount: '70000',
  //     currency: 'usd',
  //   };
  //   const transaction = await createCustomerTransaction(d, user.stripeId);
  //   console.log(transaction, 'Transaction details');
  // }

  return (
    <>
      <SafeAreaView style={CommonStyles.screenMain}>
        <AddBalanceCard
          modalVisibility={show}
          onOutsidePress={() => setShow(false)}
          loading={loader}
          onSubmit={onAddPayment}
        />
        {/* <View style={{width: '100%', alignItems: 'center'}}> */}
        {loader && <ActivityIndicator color={COLORS.MAIN_1} size="small" />}
        <ScrollableView>
          <View style={styles.topRow}>
            <View style={{width: '15%', alignItems: 'flex-start'}}>
              <BackIcon black onPress={() => navigation.goBack()} />
            </View>
            <View
              style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
              <PageNameText>Wallet</PageNameText>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{width: '48%'}}>
              {/* <BalanceCard available amount={total + total1} /> */}
              <BalanceCard available amount={balance} />
            </View>
            <View style={{width: '48%'}}>
              <BalanceCard used amount={'0'} />
            </View>
          </View>
          <View style={[styles.row, {marginVertical: 20}]}>
            <Text style={styles.name}>All Reviews</Text>
            <Icon name="filter-outline" size={15} onPress={() => {}} />
          </View>
          <View style={{width: '90%'}}>
            <TransactionsCard data={data} />
          </View>
          <View style={styles.bottom}>
            <MyButton title="Add balance" onPress={() => setShow(true)} />
          </View>
          {/* </View> */}
        </ScrollableView>
      </SafeAreaView>
      <Toast position="bottom" />
    </>
    // <FlatList
    //   ListHeaderComponent={headerComp}
    //   data={data}
    //   renderItem={renderTransaction}
    // />
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
    marginBottom: 20,
  },
  bottom: {
    // position: 'absolute',
    width: '90%',
    //bottom: 10,
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
});
