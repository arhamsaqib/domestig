import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CommonStyles} from '../../../../common/styles';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {ScrollableView} from '../../../../helpers/scrollableView';

export const ProviderProfileDetails = () => {
  var desc =
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.";
  return (
    <View style={CommonStyles.screenMain}>
      <ScrollableView>
        <View style={styles.container}>
          <Text style={[styles.field, {marginBottom: 5}]}>Email</Text>
          <Text style={styles.val}>abc@xyz.com</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.field, {marginBottom: 5}]}>Phone</Text>
          <Text style={styles.val}>+123456789</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.field, {marginBottom: 5}]}>Country</Text>
          <Text style={styles.val}>Pakistan</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
          <Text style={styles.val}>Lahore</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.field, {marginBottom: 5}]}>Description</Text>
          <Text style={styles.val}>{desc}</Text>
        </View>
        <View style={styles.container}>
          <Text style={[styles.field, {marginBottom: 5}]}>Gallery</Text>
        </View>
      </ScrollableView>
    </View>
  );
};
const styles = StyleSheet.create({
  field: {
    fontFamily: FONTS.P_Light,
    fontSize: 12,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },
  val: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
  container: {
    marginVertical: 10,
    width: '90%',
  },
});
