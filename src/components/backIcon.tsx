import React from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {ICONS} from '../constants/icons';

interface Props {
  white?: boolean;
  black?: boolean;
  onPress?(): void;
}

export const BackIcon = (props: Props) => {
  return (
    <>
      <TouchableOpacity onPress={props.onPress}>
        {props.white && (
          <Image
            source={ICONS.arrowLeftWhite}
            style={{height: 11.52, width: 25.75}}
          />
        )}
        {props.black && (
          <Image
            source={ICONS.arrowLeftBlack}
            style={{height: 11.52, width: 25.75}}
          />
        )}
      </TouchableOpacity>
    </>
  );
};
