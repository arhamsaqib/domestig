import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Avatar} from '../../../../components/avatar';
import {CheckMark} from '../../../../components/checkmark';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {ICONS} from '../../../../constants/icons';
import {MEDIA_URL} from '../../../../constants/url';

interface Props {
  name?: string;
  onPress?(): void;
  hideCheckMark?: boolean;
  data?: any;
}

export const ProviderCard = (props: Props) => {
  return (
    <TouchableOpacity style={styles.main}>
      <View style={styles.row}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Avatar
            customSize
            source={props.data.avatar && {uri: MEDIA_URL + props.data.avatar}}
            size={35}
          />
          <View style={styles.col}>
            <Text style={[styles.txt]}>{props.name ?? 'Cat'}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={ICONS.star_empty} style={styles.star} />
              <Text style={styles.rating}>
                {parseFloat(props.data.rating).toFixed(1)}
              </Text>
            </View>
          </View>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
              marginRight: 5,
            }}>
            <Text style={[styles.txt, {fontSize: 15}]}>
              {props.data.rate}/h
            </Text>
            <Text style={styles.rating}>
              {props.data.distance.toFixed(1)} km away
            </Text>
          </View>
          {!props.hideCheckMark && <CheckMark tick onPress={props.onPress} />}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    width: '100%',
    height: 50,
    borderColor: '#F2F2F2',
  },
  row: {
    height: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  txt: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
  col: {
    marginLeft: 10,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  star: {
    height: 15,
    width: 15,
    marginRight: 5,
  },
  rating: {
    fontFamily: FONTS.P_Light,
    fontSize: 10,
    opacity: 0.5,
    color: COLORS.WF_TITLE,
  },
});
