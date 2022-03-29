import React, {useEffect, useState} from 'react';
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
import {RootStateOrAny, useSelector, useStore} from 'react-redux';
import updateCurrentUserAction from '../../redux/action/currectUserAction';
import {showCustomerByFUID} from '../../api/customer';
import auth from '@react-native-firebase/auth';
import rememberMeAction from '../../redux/action/rememberMeAction';
import {THIS_VERSION} from '../../constants/version';
import {getLatestVersion} from '../../api/version';

export const Login = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [update, setUpdate] = useState(false);

  const store = useStore();
  const state = useSelector((state: RootStateOrAny) => state.rememberMe);
  function checkRememberMe() {
    if (state.rememberMe) {
      setEmail(state.email);
      setPassword(state.password);
      setRememberMe(state.rememberMe);
    }
  }

  useEffect(() => {
    checkRememberMe();
    appVersionCheck();
  }, []);

  async function appVersionCheck() {
    const res = await getLatestVersion();
    //console.log(res, 'App Version');
    if (res.version !== undefined) {
      const latest = parseFloat(res.version);
      console.log(latest, 'Latest version');
      if (latest > THIS_VERSION) {
        setUpdate(true);
        //console.log('Update');
      } else {
        //console.log('Dont Update');
      }
    }
  }

  async function verifyLaravelUser(uid: any) {
    const user = await showCustomerByFUID(uid);
    if (user.id !== undefined) {
      store.dispatch(
        updateCurrentUserAction({
          id: user.id,
        }),
      );
      if (rememberMe) {
        store.dispatch(
          rememberMeAction({
            email: email,
            password: password,
            rememberMe: true,
          }),
        );
      } else {
        store.dispatch(
          rememberMeAction({
            email: '',
            password: '',
            rememberMe: false,
          }),
        );
      }
      navigation.navigate('mainBottomNav');

      // Toast.show({
      //   type: 'success',
      //   text1: 'Auth',
      //   text2: 'Logged in successfully 👋',
      // });
      // wait(3000).then(() => {
      //   navigation.navigate('Onboarding Stack');
      // });
    }
  }
  function disabled() {
    return email.length < 8 || password.length < 8;
  }
  async function onLogin() {
    // setError('');
    setLoader(true);
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(userCredential => {
        setLoader(false);
        const uid = userCredential.user.uid;
        verifyLaravelUser(uid);
        //console.log('User account created & signed in!');
      })
      .catch((error: any) => {
        setLoader(false);

        if (error.code === 'auth/invalid-email') {
          // setError('The email address is invalid!');
        }

        if (error.code === 'auth/wrong-password') {
          //setError('Password is invalid!');
        }
        console.error(error);
      });
  }
  return (
    <>
      <GradientWrapper>
        <SafeAreaView style={styles.heading}>
          <PageNameText style={{marginVertical: 20}} white>
            Welcome Back
          </PageNameText>
          {update && (
            <FieldNameText
              style={{
                fontWeight: 'bold',
                color: 'yellow',
                //marginTop: 20,
              }}>
              A new update is available
            </FieldNameText>
          )}
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
          <View style={{width: '90%', marginBottom: 20}}>
            <FieldNameText style={{marginBottom: 5}}>Password</FieldNameText>
            <MyTextInputWithIcon
              placeholder="Enter your password"
              secureTextEntry
              onChangeText={setPassword}
              autoCapitalize="none"
              value={password}
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
              <CheckBox value={rememberMe} onChangeVal={setRememberMe} />
              <FieldNameText>Remember me</FieldNameText>
            </View>
            <MainBodyText
              onPress={() => navigation.navigate('forget')}
              style={{color: 'black'}}>
              Forgot password!
            </MainBodyText>
          </View>
          <View style={{width: '90%', marginBottom: 20}}>
            <MyButton
              title="Login Now"
              onPress={onLogin}
              loading={loader}
              disabled={disabled() || loader}
            />
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
        <FieldNameText>v{THIS_VERSION} beta</FieldNameText>
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
