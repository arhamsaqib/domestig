import React, {useEffect, useState} from 'react';
import {BottomCard} from '../../../../components/bottomCard';
import {COLORS} from '../../../../constants/colors';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {FONTS} from '../../../../constants/fonts';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {MyButton} from '../../../../components/button';
import {ProfileOverview} from './profileOverview';
import Icon from 'react-native-vector-icons/Ionicons';
//@ts-ignore
import {Stopwatch, Timer} from 'react-native-stopwatch-timer';
import {ICONS} from '../../../../constants/icons';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {TitleText} from '../../../../components/texts/titleText';

export const PausePlay = (props: {state?: boolean; onPress?(): void}) => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        height: 30,
        width: 30,
        borderRadius: 30,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
      }}>
      {props.state ? (
        <Icon name="pause-outline" size={15} />
      ) : (
        <Icon name="play-outline" size={15} />
      )}
    </TouchableOpacity>
  );
};

interface Props {
  onOutisdePress?(): void;
  modalVisibility: boolean;
  data?: any;
  onCompleteWork?(): void;
  onMessagePress?(): void;

  timer?: boolean;
  onToggleTimer?(): void;
  provider?: any;

  getTime?(time?: any): void;
  setTime?(time?: any): void;
}

export const ProviderWorkingModal = (props: Props) => {
  const {provider} = props;
  useEffect(() => {}, []);
  async function getData() {
    // const res = await getProviderById(props.providerId);
    // if (res !== undefined) {
    //   setProvider(res);
    // }
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <BottomCard
        style={{height: '35%', alignItems: 'center'}}
        modalVisibility={props.modalVisibility}
        cardTop
        cardTopChildren={
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width: '100%',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              {/* <Stopwatch
                start={props.timer}
                options={options}
                getTime={props.getTime}
                startTime={props.setTime}
              /> */}
              <View style={styles.container}>
                <Text style={styles.text}>12:10</Text>
              </View>
              <PausePlay state={props.timer} onPress={props.onToggleTimer} />
            </View>
            <View
              style={{
                alignSelf: 'flex-end',
              }}>
              <TouchableOpacity
                // onPress={props.onMessagePress}
                style={[styles.messageCont, {}]}>
                <Icon name="call-outline" size={30} color={COLORS.MAIN_1} />
              </TouchableOpacity>
              <View style={{height: 10}} />
              <TouchableOpacity
                onPress={props.onMessagePress}
                style={[styles.messageCont, {}]}>
                <Icon
                  name="chatbubble-ellipses-outline"
                  size={30}
                  color={COLORS.MAIN_1}
                />
              </TouchableOpacity>
            </View>
          </View>
        }
        cardTopStyle={{
          width: '90%',
          //alignItems: 'flex-end',
          justifyContent: 'center',
          marginBottom: 10,
        }}
        onOutsidePress={props.onOutisdePress}>
        {/* <TouchableOpacity style={[styles.messageCont, {marginTop: -200}]}>
          <Icon
            name="chatbubble-ellipses-outline"
            size={30}
            color={COLORS.MAIN_1}
          />
        </TouchableOpacity> */}
        <ScrollableView>
          <View style={{width: '90%'}}>
            <ProfileOverview name={'Name'} />
          </View>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 20,
            }}>
            <View
              style={{
                width: '40%',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Text style={[styles.field, {marginBottom: 5}]}>
                Before work image
              </Text>
              <Image
                source={
                  // (submission.before_work_image && {
                  //   uri: MEDIA_URL + submission.before_work_image,
                  // }) ??
                  ICONS.noimage
                }
                style={styles.img}
              />
            </View>
            <View
              style={{
                width: '40%',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Text style={[styles.field, {marginBottom: 5}]}>
                After work image
              </Text>
              <Image
                source={
                  // (submission.after_work_image && {
                  //   uri: MEDIA_URL + submission.after_work_image,
                  // }) ??
                  ICONS.noimage
                }
                style={styles.img}
              />
            </View>
          </View>
          <View style={{marginTop: 10, width: '90%'}}>
            <Text style={[styles.field, {marginBottom: 5}]}>Status</Text>
            <Text style={styles.statusText}>Assigned</Text>
          </View>
        </ScrollableView>
      </BottomCard>
    </>
  );
};

const styles = StyleSheet.create({
  value: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
  field: {
    fontFamily: FONTS.P_Light,
    fontSize: 12,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },

  btnRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    alignItems: 'center',
    //marginTop: 20,
    marginBottom: '10%',
  },
  messageCont: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: 80,
    width: '100%',
  },
  container: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 5,
    width: 82,
    height: 30,
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    color: 'black',
    fontFamily: FONTS.P_REGULAR,
  },
  statusText: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
  },
});
