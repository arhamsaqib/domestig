import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {BackIcon} from '../../../../components/backIcon';
import {PageNameText} from '../../../../components/texts/pageNameText';

import {ScrollableView} from '../../../../helpers/scrollableView';

export const PrivacyPolicy = ({navigation}: any) => {
  return (
    <SafeAreaView style={CommonStyles.screenMain}>
      <ScrollableView>
        <View style={styles.topRow}>
          <View style={{width: '15%', alignItems: 'flex-start'}}>
            <BackIcon black onPress={() => navigation.goBack()} />
          </View>
          <View
            style={{width: '90%', alignItems: 'center', marginLeft: '-15%'}}>
            <PageNameText>Privacy Policy</PageNameText>
          </View>
        </View>
      </ScrollableView>
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
});
