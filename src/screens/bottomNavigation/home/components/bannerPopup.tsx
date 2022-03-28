import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {BottomCard} from '../../../../components/bottomCard';
import {MyButton} from '../../../../components/button';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {ICONS} from '../../../../constants/icons';
import {MEDIA_URL} from '../../../../constants/url';
import Clipboard from '@react-native-community/clipboard';

interface Props {
  onOutsidePress?(): void;
  modalVisibility: boolean;
  data?: any;
}

export const BannerPopup = (props: Props) => {
  return (
    <BottomCard
      style={{height: '35%'}}
      onOutsidePress={props.onOutsidePress}
      modalVisibility={props.modalVisibility}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <Image
          source={{uri: MEDIA_URL + props.data.avatar}}
          style={styles.image}
        />
        <Text style={styles.desc}>{props.data.description}</Text>
        <View style={[CommonStyles.row, {width: '100%'}]}>
          <View style={styles.code}>
            <Text style={styles.dic}>{props.data.code}</Text>
          </View>
          <MyButton
            noIcon
            title="Copy code"
            style={{width: '35%', borderRadius: 5}}
            onPress={() => {
              Clipboard.setString(props.data.code);
            }}
          />
        </View>
      </View>
    </BottomCard>
  );
};

const styles = StyleSheet.create({
  image: {width: '100%', height: 95, borderRadius: 10},
  desc: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 13,
    textAlign: 'center',
    marginVertical: 10,
  },
  dic: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
  },
  code: {
    width: '60%',
    borderStyle: 'dotted',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.MAIN_1,
    borderRadius: 5,
  },
});
