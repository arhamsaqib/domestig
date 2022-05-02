import React, {useState} from 'react';
import {Alert, Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {BottomSheet} from '../../components/bottomSheet';
import {MyTextInputWithIcon} from '../../components/textinputwithicon';
import {FieldNameText} from '../../components/texts/fieldNameText';
import {PageNameText} from '../../components/texts/pageNameText';
import {GradientWrapper} from '../../helpers/gradientWrapper';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/colors';
import {MyButton} from '../../components/button';
import {BackIcon} from '../../components/backIcon';
import {ICONS} from '../../constants/icons';
import {FONTS} from '../../constants/fonts';
import auth from '@react-native-firebase/auth';
import {wait} from '../../helpers/wait';

export const ForgetPassword = ({navigation}: any) => {
  const [email, setEmail]: any = useState('');
  const [loading, setLoading] = useState(false);
  function disabled() {
    return email.length < 8;
  }
  async function onResetPress() {
    setLoading(true);
    const res = auth()
      .sendPasswordResetEmail(email)
      .then(function (user) {
        //console.log(user, 'User');
        setLoading(false);
        setEmail('');
      })
      .catch(function (e) {
        console.log(e, 'Error');
      });
    console.log(res, 'response');

    Alert.alert(
      'Reset email sent. If you cant find your email, check spam or junk folder!',
    );
    wait(3000).then(() => {
      navigation.goBack();
    });
  }

  return (
    <>
      <GradientWrapper>
        <SafeAreaView style={styles.heading}>
          <BackIcon onPress={() => navigation.goBack()} white />
          <PageNameText style={{marginVertical: 20}} white>
            Forget Password
          </PageNameText>
        </SafeAreaView>
        <BottomSheet style={{marginTop: '5%'}}>
          <View
            style={{width: '90%', marginVertical: 20, alignItems: 'center'}}>
            <Image style={{height: 220, width: 220}} source={ICONS.forget} />
            <Text style={styles.txt}>
              Please enter your email address to receive a verification code
            </Text>
          </View>
          <View style={{width: '90%', marginBottom: 20}}>
            <FieldNameText style={{marginBottom: 5}}>
              Enter your email
            </FieldNameText>
            <MyTextInputWithIcon
              placeholder="Enter your mail"
              autoCapitalize="none"
              onChangeText={setEmail}
              value={email}
              icon={
                <Icon
                  name="mail-outline"
                  size={16}
                  color={COLORS.MAIN_BODYTEXT}
                />
              }
            />
          </View>
          <View style={{width: '90%'}}>
            <MyButton
              title="Reset password"
              loading={loading}
              disabled={disabled()}
              onPress={onResetPress}
            />
          </View>
        </BottomSheet>
      </GradientWrapper>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    width: '90%',
    //margin: 50,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txt: {
    fontFamily: FONTS.P_MEDIUM,
    fontSize: 17,
    textAlign: 'center',
    marginTop: 10,
  },
});
