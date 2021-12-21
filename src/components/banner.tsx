import React from 'react';
//@ts-ignore
import {SliderBox} from 'react-native-image-slider-box';
import {COLORS} from '../constants/colors';

export const Banner = () => {
  const images = [
    'https://source.unsplash.com/1024x768/?nature',
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree', // Network image
  ];
  return (
    <SliderBox
      images={images}
      ImageComponentStyle={{width: '90%', height: 95, borderRadius: 10}}
      dotStyle={{height: 7, width: 7, borderRadius: 7}}
      dotColor={COLORS.MAIN_1}
      inactiveDotColor="#f1f7ec"
      imageLoadingColor={COLORS.MAIN_1}
    />
  );
};
