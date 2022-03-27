import React from 'react';
import {Image, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {BottomCard} from '../../../../components/bottomCard';
import {MyButton} from '../../../../components/button';
import {GreenCircle} from '../../../../components/greenCircle';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {ICONS} from '../../../../constants/icons';

interface Props {
  onOutsidePress?(): void;
  onYesPress?(): void;
  onNoPress?(): void;
  modalVisibility: boolean;
}

export const CancelVerificationModal = (props: Props) => {
  return (
    <BottomCard
      style={{height: '25%'}}
      modalVisibility={props.modalVisibility}
      onOutsidePress={props.onOutsidePress}>
      <View style={{width: '90%', alignSelf: 'center', alignItems: 'center'}}>
        <PageNameText style={{marginVertical: 4}}>
          Are you sure you want to cancel?
        </PageNameText>
        <View style={[CommonStyles.row, {width: '100%', marginTop: 30}]}>
          <MyButton
            style={{width: '48%'}}
            secondary
            title="No"
            onPress={props.onNoPress}
          />
          <MyButton
            style={{width: '48%'}}
            title="Yes"
            onPress={props.onYesPress}
          />
        </View>
      </View>
    </BottomCard>
  );
};
