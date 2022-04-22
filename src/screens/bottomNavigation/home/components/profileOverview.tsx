import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Avatar} from '../../../../components/avatar';
import {FieldNameText} from '../../../../components/texts/fieldNameText';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {ICONS} from '../../../../constants/icons';
import {MEDIA_URL} from '../../../../constants/url';

interface Props {
  data?: any;
}

export const ProfileOverview = (props: Props) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Avatar
        customSize
        size={35}
        source={props.data.avatar && {uri: MEDIA_URL + props.data.avatar}}
      />
      <View
        style={{
          alignItems: 'flex-start',
          justifyContent: 'flex-start',
          marginLeft: 10,
        }}>
        <FieldNameText>{props.data.name ?? 'Name'}</FieldNameText>
        <View style={styles.ratingCont}>
          <Image
            style={[styles.rating, {marginRight: 5}]}
            source={ICONS.rating}
          />
          <Text style={styles.ratingTxt}>
            {parseFloat(props.data.rating).toFixed(1)}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  main: {
    // flex: 1,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-end',
    height: '100%',
  },
  name: {
    fontFamily: FONTS.P_SEMIBOLD,
    fontSize: 20,
    color: COLORS.WF_TITLE,
  },
  rating: {
    height: 12,
    width: 12,
  },
  ratingTxt: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 10,
    color: COLORS.MAIN_TEXT,
    opacity: 0.42,
  },
  ratingCont: {
    flexDirection: 'row',
    alignItems: 'center',
    //width: '90%',
    justifyContent: 'center',
    marginBottom: 10,
  },
});
