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
import {ScrollableView} from '../../helpers/scrollableView';

export const Signup = ({navigation}: any) => {
  async function onLogin() {
    navigation.navigate('bottomNav');
  }
  return (
    <>
      <GradientWrapper>
        <SafeAreaView style={styles.heading}>
          <PageNameText style={{marginVertical: 20}} white>
            Getting Started
          </PageNameText>
        </SafeAreaView>
        <BottomSheet style={{marginTop: '5%'}}>
          <ScrollableView>
            <View style={{width: '90%', marginVertical: 20}}>
              <TitleText>Sign up with</TitleText>
            </View>
            <View style={{width: '90%', marginBottom: 20}}>
              <FieldNameText style={{marginBottom: 5}}>Name</FieldNameText>
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
              <FieldNameText style={{marginBottom: 5}}>Email</FieldNameText>
              <MyTextInputWithIcon
                placeholder="Enter your email"
                icon={
                  <Icon
                    name="lock-closed-outline"
                    size={16}
                    color={COLORS.MAIN_BODYTEXT}
                  />
                }
              />
            </View>
            <View style={{width: '90%', marginBottom: 20}}>
              <FieldNameText style={{marginBottom: 5}}>Phone</FieldNameText>
              <MyTextInputWithIcon
                placeholder="Enter your phone"
                icon={
                  <Icon
                    name="call-outline"
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
            <View style={{width: '90%', marginBottom: 20}}>
              <FieldNameText style={{marginBottom: 5}}>
                Confirm Password
              </FieldNameText>
              <MyTextInputWithIcon
                placeholder="Enter confirm password"
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
            <View style={{width: '90%', marginBottom: 20}}>
              <FieldNameText style={{marginBottom: 5}}>Country</FieldNameText>
              <MyTextInputWithIcon
                placeholder="Select your country"
                icon={
                  <Icon
                    name="globe-outline"
                    size={16}
                    color={COLORS.MAIN_BODYTEXT}
                  />
                }
              />
            </View>
            <View style={{width: '90%', marginBottom: 20}}>
              <FieldNameText style={{marginBottom: 5}}>Location</FieldNameText>
              <MyTextInputWithIcon
                placeholder="Enter your password"
                icon={
                  <Icon
                    name="location-outline"
                    size={16}
                    color={COLORS.MAIN_BODYTEXT}
                  />
                }
              />
            </View>

            <View style={{width: '90%', marginBottom: 300}}>
              <MyButton title="Sign up now" onPress={onLogin} />
            </View>
            {/* <View style={[CommonStyles.row, CommonStyles.subView]}>
              <DividerP style={{width: '30%'}} />
              <FieldNameText>Or Sign in with</FieldNameText>
              <DividerP style={{width: '30%'}} />
            </View> */}
          </ScrollableView>
        </BottomSheet>
      </GradientWrapper>
      {/* <View
        style={[CommonStyles.bottom5p, {width: '90%', alignItems: 'center'}]}>
        <FieldNameText>
          Don't have an account?{' '}
          <FieldNameText
            onPress={() => {}}
            style={{color: COLORS.MAIN_1, fontWeight: 'bold'}}>
            Sign up
          </FieldNameText>
        </FieldNameText>
      </View> */}
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
