import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {ICONS} from '../../../../constants/icons';

interface Props {
  onPress?(): void;
  hourlyRate?: string;
  title?: string;
  rating?: string;
  by?: string;
}

export const RecommendedCard = (props: Props) => {
  return (
    <TouchableOpacity style={styles.main}>
      <View style={{height: '100%', width: '33%'}}>
        <Image
          source={{uri: 'https://source.unsplash.com/1024x768/?nature'}}
          style={styles.img}
        />
      </View>
      <View
        style={{
          width: '76%',
          alignItems: 'center',
          height: '100%',
        }}>
        <View
          style={{
            width: '90%',
            marginTop: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Image
              source={ICONS.rating}
              style={[styles.rating, {marginRight: 5}]}
            />
            <Text style={styles.ratingTxt}>
              {props.rating ?? '4.2'} out of 5
            </Text>
          </View>
          <Text style={[styles.title, {width: '90%', marginVertical: 10}]}>
            {props.title ?? 'Wipe Down Appliances (fridge etc)'}
          </Text>
          <Text style={[styles.ratingTxt, {width: '90%', fontSize: 12}]}>
            By {props.by ?? 'Arham Saqib'}
          </Text>
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text style={styles.price}>${props.hourlyRate ?? '24'}</Text>
            <Text style={styles.priceSmall}>/h</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 155,
    backgroundColor: COLORS.WF2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
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
  title: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
  price: {
    fontFamily: FONTS.P_BOLD,
    fontSize: 19,
    color: COLORS.WF_TITLE,
  },
  priceSmall: {
    fontFamily: FONTS.P_BOLD,
    fontSize: 10,
    color: COLORS.WF_TITLE,
  },
  img: {
    height: '100%',
    width: '100%',
  },
});
