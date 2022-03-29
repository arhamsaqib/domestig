import React from 'react';
import {ImageBackground, StyleSheet, View} from 'react-native';
import {CommonStyles} from '../../common/styles';
import {MyButton} from '../../components/button';
import {PageIndicator} from '../../components/pageIndicator';
import {MainBodyText} from '../../components/texts/mainBodyText';
import {PageNameText} from '../../components/texts/pageNameText';
import {TitleText} from '../../components/texts/titleText';
import {ICONS} from '../../constants/icons';

export const Onboarding1 = ({navigation}: any) => {
  function onNextPress() {
    navigation.navigate('ob2');
  }
  return (
    <ImageBackground source={ICONS.onboarding1} style={styles.main}>
      <View style={styles.titleCont}>
        <TitleText style={{textAlign: 'center'}}>
          This is the main title
        </TitleText>
      </View>
      <View style={styles.subtitleCont}>
        <MainBodyText style={{textAlign: 'center'}}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </MainBodyText>
      </View>
      <View style={styles.indicator}>
        <PageIndicator page={1} />
      </View>
      <View style={[CommonStyles.bottom5p, CommonStyles.row, {width: '90%'}]}>
        <View style={{width: '30%', alignItems: 'center'}}>
          <PageNameText onPress={() => navigation.navigate('authStack')}>
            Skip
          </PageNameText>
        </View>
        <View style={{width: '40%'}}>
          <MyButton title="Next" onPress={onNextPress} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
  },
  titleCont: {
    width: '90%',
    position: 'absolute',
    top: '60%',
  },
  subtitleCont: {
    width: '80%',
    position: 'absolute',
    top: '65%',
  },
  indicator: {
    width: '80%',
    position: 'absolute',
    top: '75%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
