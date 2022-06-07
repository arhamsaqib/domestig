import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native';
import {Divider} from '../../../../../components/divider';
import {FONTS} from '../../../../../constants/fonts';
import {ConvertDateToObject} from '../../../../../helpers/convertDateTobject';

interface Props {
  available?: boolean;
  used?: boolean;
  data?: any;
  headerComp?: any;
}

export const Transaction = (props: {data?: any}) => {
  const {data} = props;
  const amount = ((parseFloat(data.amount) * 1) / 100).toString();
  const id = data.id;
  const d = data.created * 1000;
  const date = ConvertDateToObject(d);
  const status =
    Math.sign(parseFloat(data.amount)) === -1 ? 'Deducted' : 'Added';
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', width: '90%'}}>
      <View
        style={{
          width: '20%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 35,
          marginRight: 10,
        }}>
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={[styles.val, {width: '90%'}]}>
          {data.id}
        </Text>
      </View>
      <View
        style={{
          width: '20%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 35,
        }}>
        <Text style={styles.val}>
          {'$'}
          {amount}
        </Text>
      </View>
      <View
        style={{
          width: '30%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 35,
        }}>
        <Text style={styles.val}>
          {date.month + ' ' + date.date + ', ' + date.year}
        </Text>
      </View>
      <View
        style={{
          width: '40%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 35,
        }}>
        <Text style={styles.val}>{status}</Text>
      </View>
      <View
        style={{
          // width: '40%',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: 35,
        }}>
        <Text style={styles.val}>456</Text>
      </View>
    </View>
  );
};

export const TransactionsCard = (props: Props) => {
  console.log(props.data, 'DATA TRANs');

  function renderTransaction({item}: any) {
    console.log(item, 'item dataaa');

    return <Transaction data={item} />;
  }

  return (
    <>
      <View style={styles.main}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{
            flexDirection: 'row',
            width: '90%',
          }}>
          <View
            style={{
              // width: '30%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 35,
              marginRight: 50,
            }}>
            <Text style={styles.head}>ID</Text>
          </View>
          <View
            style={{
              //width: '30%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 35,
              marginRight: 50,
            }}>
            <Text style={styles.head}>Amount</Text>
          </View>
          <View
            style={{
              // width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 35,
              marginRight: 50,
            }}>
            <Text style={styles.head}>Date</Text>
          </View>
          <View
            style={{
              // width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 35,
              marginRight: 50,
            }}>
            <Text style={styles.head}>Action</Text>
          </View>
          <View
            style={{
              // width: '40%',
              alignItems: 'flex-start',
              justifyContent: 'center',
              height: 35,
            }}>
            <Text style={styles.head}>Summary</Text>
          </View>
        </ScrollView>
        <Divider />
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            justifyContent: 'center',
            //  borderWidth: 1,
          }}>
          <ScrollView horizontal style={{width: '90%', alignSelf: 'center'}}>
            <FlatList
              data={props.data.data}
              showsVerticalScrollIndicator
              renderItem={renderTransaction}
              style={{height: '90%'}}
            />
          </ScrollView>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    //width:160,
    height: 409,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    //borderWidth: 1,
    backgroundColor: 'white',
    width: '100%',
    borderRadius: 3,
  },
  val: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 13,
    color: '#666666',
  },
  head: {
    fontFamily: FONTS.P_MEDIUM,
    fontSize: 15,
    color: '#222222',
  },
  imegCont: {
    height: 52,
    width: 52,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    backgroundColor: '#f1f7ec',
  },
  wallet: {
    width: 34.63,
    height: 35.75,
  },
  cash: {
    width: 35.75,
    height: 34.56,
  },
});
