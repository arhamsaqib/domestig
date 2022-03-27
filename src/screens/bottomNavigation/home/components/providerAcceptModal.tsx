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
  onCancelPress?(): void;
  onCheckBooking?(): void;
  modalVisibility: boolean;
}

export const ProviderAcceptModal = (props: Props) => {
  return (
    <BottomCard
      style={{height: '30%'}}
      modalVisibility={props.modalVisibility}
      onOutsidePress={props.onOutsidePress}>
      <View style={{width: '90%', alignSelf: 'center', alignItems: 'center'}}>
        <GreenCircle s60>
          <Image source={ICONS.clock} style={{width: 30.14, height: 29}} />
        </GreenCircle>
        <PageNameText style={{marginVertical: 4}}>
          Waiting for provider to accept
        </PageNameText>
        <View style={[CommonStyles.row, {width: '100%', marginTop: 10}]}>
          <MyButton
            style={{width: '48%'}}
            secondary
            title="Cancel"
            onPress={props.onCancelPress}
          />
          <MyButton
            style={{width: '48%'}}
            title="Check Booking"
            onPress={props.onCheckBooking}
          />
        </View>
      </View>
    </BottomCard>
  );
};
