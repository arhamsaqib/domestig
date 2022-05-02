import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getCustomerById} from '../../../../api/customer';
import {
  generateReferralCode,
  viewUserReferralCode,
} from '../../../../api/userReferrals';
import {CommonStyles} from '../../../../common/styles';
import {BackIcon} from '../../../../components/backIcon';
import {MyButton} from '../../../../components/button';
import {GreenCircle} from '../../../../components/greenCircle';
import {MyTextInput} from '../../../../components/textinput';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {ReferralsCard} from './components/referralsCard';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-toast-message';

export const Referrals = ({navigation}: any) => {
  const [loader, setLoader]: any = useState(false);
  const [data, setData]: any = useState([]);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);

  async function getData() {
    setLoader(true);
    const find = {
      uid: state.id,
      user_type: 'customer',
    };
    const res = await viewUserReferralCode(find).finally(() =>
      setLoader(false),
    );
    if (res.message === 'Record not found.') {
      const user = await getCustomerById(state.id);
      if (user.id !== undefined) {
        const n = {
          name: user.name,
          user_type: 'customer',
          uid: state.id,
        };
        //console.log(n, 'new');
        const refer = await generateReferralCode(n);
        if (refer !== undefined) {
          setData(refer);
        }
      }
    } else {
      if (res.id !== undefined) {
        setData(res);
      }
    }
    console.log(res, 'refer');
  }

  useEffect(() => {
    getData();
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
            <PageNameText>Referrals</PageNameText>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{width: '48%'}}>
            <ReferralsCard title="Referrals" value="0" />
          </View>
          <View style={{width: '48%'}}>
            <ReferralsCard title="Earnings" value="$0" />
          </View>
        </View>
        <Text style={[styles.codeTxt, {marginVertical: 10}]}>
          Your referral code
        </Text>
        <View style={styles.codeContainer}>
          <Text style={styles.code}>{data.code}</Text>
        </View>
        <Text
          style={[
            styles.linkTxt,
            {marginVertical: 10, width: '70%', textAlign: 'center'},
          ]}>
          Use the code or share your referral link
        </Text>
        <View style={styles.row}>
          <View style={{width: '68%'}}>
            <MyTextInput
              style={{borderRadius: 5}}
              value={'domestig.com/' + data.code}
            />
          </View>
          <View style={{width: '30%'}}>
            <MyButton
              style={{borderRadius: 5}}
              noIcon
              title="Copy link"
              onPress={() => {
                Clipboard.setString('domestig.com/' + data.code);
                Toast.show({
                  type: 'success',
                  text1: 'Referral',
                  text2: 'Code copied successfully',
                });
              }}
            />
          </View>
        </View>
        <Text
          style={[
            styles.linkTxt,
            {marginVertical: 10, width: '70%', textAlign: 'center'},
          ]}>
          or share with
        </Text>
        <View style={styles.row}>
          <View style={{width: '19%'}}>
            <GreenCircle s50>
              <Icon name="facebook" color={COLORS.MAIN_2} size={25} />
            </GreenCircle>
          </View>
          <View style={{width: '19%'}}>
            <GreenCircle s50>
              <Icon name="twitter" color={COLORS.MAIN_2} size={25} />
            </GreenCircle>
          </View>
          <View style={{width: '19%'}}>
            <GreenCircle s50>
              <Icon name="instagram" color={COLORS.MAIN_2} size={25} />
            </GreenCircle>
          </View>
          <View style={{width: '19%'}}>
            <GreenCircle s50>
              <Icon name="linkedin" color={COLORS.MAIN_2} size={25} />
            </GreenCircle>
          </View>
          <View style={{width: '19%'}}>
            <GreenCircle s50>
              <Icon name="ellipsis-h" color={COLORS.MAIN_2} size={25} />
            </GreenCircle>
          </View>
        </View>
      </SafeAreaView>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    alignItems: 'center',
    marginVertical: 20,
  },
  codeTxt: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
  code: {
    fontFamily: FONTS.P_SEMIBOLD,
    fontSize: 25,
    color: COLORS.MAIN_SUBTEXT,
  },
  codeContainer: {
    minWidth: '50%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.MAIN_1,
    padding: 10,
  },
  linkTxt: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 13,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },
});
