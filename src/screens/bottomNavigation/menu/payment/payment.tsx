import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getCustomerById} from '../../../../api/customer';
import {
  createCardToken,
  createStriprCustomerCard,
} from '../../../../api/stripe/card';
import {CommonStyles} from '../../../../common/styles';
import {BackIcon} from '../../../../components/backIcon';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {ICONS} from '../../../../constants/icons';
import {EditCreditCardModal} from './components/editCreditCardModal';
import {PaymentCard} from './components/paymentCard';
import Toast from 'react-native-toast-message';
import {
  getUserCardStatus,
  updateUserCardStatus,
} from '../../../../api/cardStatus';

export const Payment = ({navigation}: any) => {
  const [toggle, setToggle]: any = useState(false);
  const [showCard, setShowcard]: any = useState(false);
  const [loading, setLoading]: any = useState(false);
  const [cardStatus, setCardStauts]: any = useState([]);

  const state = useSelector((state: RootStateOrAny) => state.currentUser);

  async function onCardSubmit(data: any) {
    setLoading(true);
    const res = await getCustomerById(state.id);
    // console.log(res, 'customer');

    const tokenRes = await createCardToken(data);
    const cardRes = await createStriprCustomerCard(
      tokenRes.id,
      res.stripeId,
    ).finally(() => {
      setLoading(false);
      setShowcard(false);
    });
    console.log(cardRes, 'New Custoemr Card');
    Toast.show({
      type: 'success',
      text1: 'Card Added',
      text2: 'Card with name ' + data.name + ' has been added!',
    });
  }

  async function GetData() {
    const res = await getUserCardStatus(state.id);
    if (res !== undefined) {
      setCardStauts(res);
    }
    console.log(res, 'Card Status');
    if (res.status === 'on') {
      setToggle(true);
    }
  }

  async function onToggle(val: any) {
    setLoading(true);
    const tval = val === true ? 'on' : 'off';
    const data = {
      user_type: 'customer',
      user_id: state.id,
      status: tval,
    };
    const res = await updateUserCardStatus(data).finally(() =>
      setLoading(false),
    );
    console.log(res, 'Update Status');
    setToggle(val);
    return val;
  }

  useEffect(() => {
    GetData();
  }, []);

  return (
    <>
      <SafeAreaView style={CommonStyles.screenMain}>
        <View style={styles.topRow}>
          <View style={{width: '15%', alignItems: 'flex-start'}}>
            <BackIcon black onPress={() => navigation.goBack()} />
          </View>
          <View
            style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
            <PageNameText>Payment</PageNameText>
          </View>
        </View>
        <View style={{width: '90%', marginTop: 10}}>
          <PaymentCard
            name="Credit Card"
            switch
            editable
            //@ts-ignore
            onToggle={onToggle}
            toggleValue={toggle}
            onEditPress={() => setShowcard(true)}
            icon={<Image source={ICONS.card} style={{height: 17, width: 21}} />}
          />
          <PaymentCard
            name="Cash"
            default
            icon={<Image source={ICONS.cash} style={{height: 21, width: 21}} />}
          />
          <PaymentCard
            name="Wallet"
            default
            icon={
              <Image source={ICONS.wallet} style={{height: 19.6, width: 21}} />
            }
          />
        </View>
      </SafeAreaView>
      <EditCreditCardModal
        modalVisibility={showCard}
        onOutsidePress={() => setShowcard(false)}
        onSubmit={onCardSubmit}
        loading={loading}
      />
      <Toast position="bottom" />
    </>
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
    position: 'absolute',
    width: '90%',
    bottom: 10,
  },
});
