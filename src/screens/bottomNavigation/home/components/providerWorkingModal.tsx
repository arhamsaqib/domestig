import React from 'react';
import {BottomCard} from '../../../../components/bottomCard';
import {COLORS} from '../../../../constants/colors';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import {FONTS} from '../../../../constants/fonts';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {ProfileOverview} from './profileOverview';
import Icon from 'react-native-vector-icons/Ionicons';
import {ICONS} from '../../../../constants/icons';
import {MEDIA_URL} from '../../../../constants/url';

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
        <Icon name="pause-outline" size={15} color="black" />
      ) : (
        <Icon name="play-outline" size={15} color="black" />
      )}
    </TouchableOpacity>
  );
};

interface Props {
  onOutisdePress?(): void;
  modalVisibility: boolean;
  onMessagePress?(): void;
  onPhonePress?(): void;

  provider?: any;
  submissionData?: any;

  status?: string;
}

export const ProviderWorkingModal = (props: Props) => {
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
              <View style={styles.container}>
                <Text style={styles.text}>
                  {props.submissionData.time_taken ?? 'N/A'}
                </Text>
              </View>
            </View>
            <View
              style={{
                alignSelf: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={props.onPhonePress}
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
          justifyContent: 'center',
          marginBottom: 10,
        }}
        onOutsidePress={props.onOutisdePress}>
        <ScrollableView>
          <View style={{width: '90%'}}>
            <ProfileOverview data={props.provider ?? {}} />
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
                  (props.submissionData.before_work_image && {
                    uri: MEDIA_URL + props.submissionData.before_work_image,
                  }) ??
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
                  (props.submissionData.after_work_image && {
                    uri: MEDIA_URL + props.submissionData.after_work_image,
                  }) ??
                  ICONS.noimage
                }
                style={styles.img}
              />
            </View>
          </View>
          <View style={{marginTop: 10, width: '90%'}}>
            <Text style={[styles.field, {marginBottom: 5}]}>Status</Text>
            <Text style={styles.statusText}>{props.status ?? 'N/A'}</Text>
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
    color: 'black',
  },
});
