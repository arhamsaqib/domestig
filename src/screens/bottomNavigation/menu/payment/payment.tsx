import React from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {BackIcon} from '../../../../components/backIcon';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {ICONS} from '../../../../constants/icons';
import {PaymentCard} from './components/paymentCard';

export const Payment = ({navigation}: any) => {
  return (
    <SafeAreaView style={CommonStyles.screenMain}>
      <View style={styles.topRow}>
        <View style={{width: '15%', alignItems: 'flex-start'}}>
          <BackIcon black onPress={() => navigation.goBack()} />
        </View>
        <View style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
          <PageNameText>Payment</PageNameText>
        </View>
      </View>
      <View style={{width: '90%', marginTop: 10}}>
        <PaymentCard
          name="Credit Card"
          switch
          editable
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
