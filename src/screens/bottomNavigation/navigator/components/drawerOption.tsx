import React from 'react';
import {
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';

interface Props {
  name?: string;
  onPress?(): void;
  iconName: string;
  opened?: boolean;
  icon?: any;
  image?: any;
}

export const DrawerOption = (props: Props) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.main}>
      {/* <Icon
        name={props.iconName}
        size={20}
        color={props.opened ? COLORS.MAIN_2 : COLORS.MAIN_SUBTEXT}
      /> */}
      {props.image && (
        <Image source={props.image.source} style={props.image.style} />
      )}
      <Text
        style={[
          styles.name,
          props.opened && {color: COLORS.MAIN_2},
          !props.opened && {color: COLORS.MAIN_SUBTEXT},
        ]}>
        {props.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    //borderWidth: 1,
    alignItems: 'center',
    height: 40,
    marginBottom: 2,
  },
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 14,
    color: COLORS.WF_TITLE,
    marginLeft: 10,
  },
});
