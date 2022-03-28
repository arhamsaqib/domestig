import React, {useEffect, useState} from 'react';
//@ts-ignore
import {SliderBox} from 'react-native-image-slider-box';
import {viewAllBanners} from '../api/banners';
import {COLORS} from '../constants/colors';
import {MEDIA_URL} from '../constants/url';
import {BannerPopup} from '../screens/bottomNavigation/home/components/bannerPopup';

export const Banner = () => {
  const [banners, setBanners]: any = useState([]);
  const [infoModal, setInfoModal]: any = useState([]);
  const [selected, setSelected]: any = useState([]);

  function extractKeys(arr: []) {
    let result = arr.map((a: any) => MEDIA_URL + a.avatar);
    return result;
  }

  const images = extractKeys(banners);
  console.log(images);

  async function getData() {
    const bann = await viewAllBanners();
    if (bann !== undefined) {
      setBanners(bann);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function onImagePress(index: any) {
    console.log(banners[index], 'index');
    setSelected(banners[index]);
    setInfoModal(true);
  }

  // const images = [
  //   'https://source.unsplash.com/1024x768/?nature',
  //   'https://source.unsplash.com/1024x768/?water',
  //   'https://source.unsplash.com/1024x768/?girl',
  //   'https://source.unsplash.com/1024x768/?tree', // Network image
  // ];
  return (
    <>
      <SliderBox
        images={images}
        ImageComponentStyle={{width: '90%', height: 95, borderRadius: 10}}
        dotStyle={{height: 7, width: 7, borderRadius: 7}}
        dotColor={COLORS.MAIN_1}
        inactiveDotColor="#f1f7ec"
        imageLoadingColor={COLORS.MAIN_1}
        onCurrentImagePressed={onImagePress}
      />
      <BannerPopup
        modalVisibility={infoModal}
        onOutsidePress={() => setInfoModal(false)}
        data={selected}
      />
    </>
  );
};
