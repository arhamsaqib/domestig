import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {BottomCard} from '../../../../components/bottomCard';
import {MyButton} from '../../../../components/button';
import {GreenCircle} from '../../../../components/greenCircle';
import {FieldNameText} from '../../../../components/texts/fieldNameText';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {COLORS} from '../../../../constants/colors';
import {ICONS} from '../../../../constants/icons';

interface Props {
  onOutsidePress?(): void;
  modalVisibility: boolean;
  code?: string;
}

export const VerificationCodeModal = (props: Props) => {
  return (
    <BottomCard
      style={{height: '22%'}}
      modalVisibility={props.modalVisibility}
      onOutsidePress={props.onOutsidePress}>
      <View style={{width: '90%', alignSelf: 'center', alignItems: 'center'}}>
        <PageNameText style={{marginVertical: 4, textAlign: 'center'}}>
          Service provider just arrived. here is the verification code
        </PageNameText>
        <View style={styles.code}>
          <PageNameText>{props.code ?? 'xxxx'}</PageNameText>
        </View>
      </View>
    </BottomCard>
  );
};

const styles = StyleSheet.create({
  code: {
    height: 45,
    borderWidth: 1,
    width: 100,
    borderColor: COLORS.MAIN_1,
    borderStyle: 'dotted',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
