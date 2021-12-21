import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {BackIcon} from '../../../../components/backIcon';
import {MyButton} from '../../../../components/button';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {AddAddressCard} from './components/addAddressCard';
import {AddressCard} from './components/addressCard';

export const Addresses = ({navigation}: any) => {
  const [show, setShow] = useState(false);
  return (
    <SafeAreaView style={CommonStyles.screenMain}>
      <View style={styles.topRow}>
        <View style={{width: '15%', alignItems: 'flex-start'}}>
          <BackIcon black onPress={() => navigation.goBack()} />
        </View>
        <View style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
          <PageNameText>Addresses</PageNameText>
        </View>
      </View>
      <View style={{width: '90%', marginTop: 10}}>
        <AddressCard />
        <AddressCard />
        <AddressCard />
      </View>
      <AddAddressCard
        modalVisibility={show}
        onOutsidePress={() => setShow(false)}
      />
      <View style={styles.bottom}>
        <MyButton title="Add new address" onPress={() => setShow(true)} />
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
