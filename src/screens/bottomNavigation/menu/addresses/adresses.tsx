import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import {
  createCustomerAddress,
  RegisterCustomerAdress,
  showCustomerAllAddresses,
  updateCustomerAddress,
} from '../../../../api/customerAddresses';
import {CommonStyles} from '../../../../common/styles';
import {BackIcon} from '../../../../components/backIcon';
import {MyButton} from '../../../../components/button';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {COLORS} from '../../../../constants/colors';
import {AddAddressCard} from './components/addAddressCard';
import {AddressCard} from './components/addressCard';
import {UpdateAddressCard} from './components/updateAddressCard';

export const Addresses = ({navigation}: any) => {
  const [show, setShow] = useState(false);
  const [loader, setLoader]: any = useState(false);
  const [addresses, setAddresses]: any = useState([]);
  const [selected, setSelected]: any = useState([]);
  const [updateMOdal, setUpdateModal]: any = useState(false);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);

  async function getData() {
    setLoader(true);
    const res = await showCustomerAllAddresses(state.id).finally(() =>
      setLoader(false),
    );
    if (res !== undefined) {
      setAddresses(res);
    }
  }

  async function onSaveNewAddress(data: RegisterCustomerAdress) {
    setLoader(true);
    const res = await createCustomerAddress(data).finally(() =>
      setLoader(false),
    );
    // console.log(res, 'new address');
    setShow(false);
    getData();
  }
  async function onUpdatePress(adressId: string, data: any) {
    console.log(data);
    const res = await updateCustomerAddress(adressId, data);
    console.log(res, 'update address');
    setUpdateModal(false);
    getData();
  }

  function onEditPress(item: any) {
    setSelected(item);
    setUpdateModal(true);
  }

  const renderAddresses = ({item}: any) => {
    return (
      <AddressCard name={item.name} onEditPress={() => onEditPress(item)} />
    );
  };

  useEffect(() => {
    getData();
  }, []);

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
      {loader && <ActivityIndicator color={COLORS.MAIN_1} />}
      <View style={{width: '90%', marginTop: 10}}>
        <FlatList data={addresses} renderItem={renderAddresses} />
      </View>
      <AddAddressCard
        modalVisibility={show}
        onOutsidePress={() => setShow(false)}
        onSavePress={onSaveNewAddress}
      />
      <UpdateAddressCard
        modalVisibility={updateMOdal}
        onOutsidePress={() => setUpdateModal(false)}
        item={selected}
        onSavePress={onUpdatePress}
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
