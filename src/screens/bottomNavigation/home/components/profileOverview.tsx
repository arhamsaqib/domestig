import React from 'react';
import {View} from 'react-native';
import {Avatar} from '../../../../components/avatar';
import {FieldNameText} from '../../../../components/texts/fieldNameText';

interface Props {
  name?: string;
}

export const ProfileOverview = (props: Props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Avatar customSize size={35} />
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginLeft: 10,
        }}>
        <FieldNameText>{props.name ?? 'Name'}</FieldNameText>
      </View>
    </View>
  );
};
