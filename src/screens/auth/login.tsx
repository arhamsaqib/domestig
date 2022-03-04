import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {BottomSheet} from '../../components/bottomSheet';
import {MyTextInputWithIcon} from '../../components/textinputwithicon';
import {FieldNameText} from '../../components/texts/fieldNameText';
import {PageNameText} from '../../components/texts/pageNameText';
import {TitleText} from '../../components/texts/titleText';
import {GradientWrapper} from '../../helpers/gradientWrapper';
import Icon from 'react-native-vector-icons/Ionicons';
import {COLORS} from '../../constants/colors';
import {MyButton} from '../../components/button';
import {CommonStyles} from '../../common/styles';
import {CheckBox} from '../../components/checkbox';
import {MainBodyText} from '../../components/texts/mainBodyText';
import {DividerP} from '../../components/dividerp';

export const Login = ({navigation}: any) => {
  async function onLogin() {
    navigation.navigate('bottomNav');
  }
  return (
    <>
      <GradientWrapper>
        <SafeAreaView style={styles.heading}>
          <PageNameText style={{marginVertical: 20}} white>
            Welcome Back
          </PageNameText>
        </SafeAreaView>
        <BottomSheet style={{marginTop: '5%'}}>
          <View style={{width: '90%', marginVertical: 20}}>
            <TitleText>Login with</TitleText>
          </View>
          <View style={{width: '90%', marginBottom: 20}}>
            <FieldNameText style={{marginBottom: 5}}>Email</FieldNameText>
            <MyTextInputWithIcon
              placeholder="Enter your mail"
              autoCapitalize="none"
              icon={
                <Icon
                  name="mail-outline"
                  size={16}
                  color={COLORS.MAIN_BODYTEXT}
                />
              }
            />
          </View>
          <View style={{width: '90%', marginBottom: 20}}>
            <FieldNameText style={{marginBottom: 5}}>Password</FieldNameText>
            <MyTextInputWithIcon
              placeholder="Enter your password"
              secureTextEntry
              icon={
                <Icon
                  name="lock-closed-outline"
                  size={16}
                  color={COLORS.MAIN_BODYTEXT}
                />
              }
            />
          </View>
          <View
            style={[
              CommonStyles.subView,
              CommonStyles.row,
              {marginBottom: 30},
            ]}>
            <View style={[CommonStyles.row, {width: '40%'}]}>
              <CheckBox />
              <FieldNameText>Remember me</FieldNameText>
            </View>
            <MainBodyText style={{color: 'black'}} onPress={() => {}}>
              Forgot password!
            </MainBodyText>
          </View>
          <View style={{width: '90%', marginBottom: 20}}>
            <MyButton title="Login Now" onPress={onLogin} />
          </View>
          <View style={[CommonStyles.row, CommonStyles.subView]}>
            <DividerP style={{width: '30%'}} />
            <FieldNameText>Or Sign in with</FieldNameText>
            <DividerP style={{width: '30%'}} />
          </View>
        </BottomSheet>
      </GradientWrapper>
      <View
        style={[CommonStyles.bottom5p, {width: '90%', alignItems: 'center'}]}>
        <FieldNameText>
          Don't have an account?{' '}
          <FieldNameText
            onPress={() => navigation.navigate('signup')}
            style={{color: COLORS.MAIN_1, fontWeight: 'bold'}}>
            Sign up
          </FieldNameText>
        </FieldNameText>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  heading: {
    width: '90%',
    //margin: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
