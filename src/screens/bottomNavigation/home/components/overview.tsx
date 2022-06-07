import React, {useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import StarRating from 'react-native-star-rating';
import {RootStateOrAny, useSelector} from 'react-redux';
import {getBookingById} from '../../../../api/bookings';
import {showBookingSubmission} from '../../../../api/bookingSubmission';
import {viewInvoiceByBookingId} from '../../../../api/invoice';
import {showProviderWithId} from '../../../../api/provider';
import {CommonStyles} from '../../../../common/styles';
import {Avatar} from '../../../../components/avatar';
import {BackIcon} from '../../../../components/backIcon';
import {BottomCard} from '../../../../components/bottomCard';
import {MyButton} from '../../../../components/button';
import {GreenCircle} from '../../../../components/greenCircle';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {COLORS} from '../../../../constants/colors';
import {FONTS} from '../../../../constants/fonts';
import {ICONS} from '../../../../constants/icons';
import {MEDIA_URL} from '../../../../constants/url';
import {ScrollableView} from '../../../../helpers/scrollableView';
import {ProviderDetails} from '../../history/provider/providerDetails';

interface Props {
  provider?: any;
  submission?: any;
  booking?: any;
  visibility: boolean;
  onCompletePayment?(provider?: any, amount?: any, booking?: any): void;
}

export const ServiceOverview = (props: Props) => {
  const state = useSelector((state: RootStateOrAny) => state.currentBooking);

  const [card, setCard] = useState(false);
  const [laoder, setLoader] = useState(false);
  const [submission, setSubmission]: any = useState([]);
  const [provider, setProvider]: any = useState([]);
  const [customer, setCustomer]: any = useState([]);
  const [invoice, setInvoice]: any = useState([]);
  const [booking, setBooking]: any = useState([]);

  async function getData() {
    setLoader(true);

    const bkn = await getBookingById(state.id);
    if (bkn !== undefined) {
      setBooking(bkn);
    }
    const res = await showProviderWithId(bkn.provider_id).finally(() =>
      setLoader(false),
    );
    const bs = await showBookingSubmission(bkn.id);
    if (res !== undefined) {
      setProvider(res);
    }
    if (bs !== undefined) {
      setSubmission(bs);
    }
    console.log(bs, 'submission');
    const inv = await viewInvoiceByBookingId(bkn.id);
    if (inv !== undefined) {
      setInvoice(inv);
    }
  }

  function calcAmount() {
    let timeString = submission.time_taken;
    var total = 0;
    var min = 0;
    if (submission.time_taken) {
      let regExTime: any = /([0-9]?[0-9]):([0-9][0-9]):([0-9][0-9])/;
      let regExTimeArr = regExTime.exec(timeString);
      // let timeHr = regExTimeArr[1] * 3600 * 1000;
      // let timeMin = regExTimeArr[2] * 60 * 1000;
      // let timeSec = regExTimeArr[3] * 1000;
      let timeHr = parseInt(regExTimeArr[1]);
      let timeMin = parseInt(regExTimeArr[2]);
      let timeSec = parseInt(regExTimeArr[3]);

      total = timeHr * parseFloat(booking.rate);
      min = (timeMin / 60) * parseFloat(booking.rate);
    }
    return total + min;
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <BottomCard modalVisibility={props.visibility} style={{height: '90%'}}>
      <SafeAreaView style={CommonStyles.screenMain}>
        <View style={{marginTop: 10}} />

        <ProviderDetails
          data={provider}
          modalVisibility={card}
          onOutsidePress={() => setCard(false)}
        />
        <ScrollableView>
          <View style={styles.topRow}>
            <View style={{width: '100%'}}>
              <PageNameText>Service Complete Details</PageNameText>
            </View>
          </View>
          <View style={styles.categoryNameContainer}>
            <GreenCircle broom s41 />
            <Text style={[styles.name, {marginLeft: 5}]}>
              {/* {Service Category Name} */}
              {booking.category_name + ' (' + booking.services + ')'}
            </Text>
          </View>
          <View
            style={{
              width: '90%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View
              style={{
                width: '40%',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Text style={[styles.field, {marginBottom: 5}]}>Booking ID</Text>
              <Text style={styles.value}>#{booking.id}</Text>
            </View>
            <View
              style={{
                width: '40%',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
              }}>
              <Text style={[styles.field, {marginBottom: 5}]}>Status</Text>
              <Text style={styles.value}>{booking.status}</Text>
            </View>
          </View>
          <View style={{width: '90%', marginVertical: 10}}>
            <Text style={[styles.field, {marginBottom: 5}]}>
              Verification Code
            </Text>
            <Text style={[styles.value]}>{booking.verification_code}</Text>
          </View>
          <View style={{width: '90%', marginVertical: 10}}>
            <Text style={[styles.field, {marginBottom: 5}]}>Location</Text>
            <Text style={[styles.value]}>{booking.location}</Text>
          </View>
          {true && (
            <>
              <View style={{width: '90%', marginVertical: 10}}>
                <Text style={styles.head}>Provider details</Text>
              </View>
              <View style={styles.pDetailsContainer}>
                <View style={styles.avatrNameCont}>
                  <Avatar
                    customSize
                    size={41}
                    onPress={() => setCard(true)}
                    source={
                      provider.avatar && {uri: MEDIA_URL + provider.avatar}
                    }
                    pressable
                  />
                  <Text style={[styles.name, {marginLeft: 5}]}>
                    {provider.name}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.valueBold}>{booking.rate}</Text>
                  <Text style={styles.value}>/h</Text>
                </View>
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
                      (submission.before_work_image && {
                        uri: MEDIA_URL + submission.before_work_image,
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
                      (submission.after_work_image && {
                        uri: MEDIA_URL + submission.after_work_image,
                      }) ??
                      ICONS.noimage
                    }
                    style={styles.img}
                  />
                </View>
              </View>
              <View style={{width: '90%', marginVertical: 20}}>
                <Text style={styles.head}>Invoice</Text>
              </View>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    width: '40%',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  }}>
                  <Text style={[styles.field, {marginBottom: 5}]}>
                    Service start time
                  </Text>
                  <Text style={styles.value}>10:35 AM</Text>
                </View>
                <View
                  style={{
                    width: '40%',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                  }}>
                  <Text style={[styles.field, {marginBottom: 5}]}>
                    Service end time
                  </Text>
                  <Text style={styles.value}>02:25 PM</Text>
                </View>
              </View>
              <View style={{width: '90%', marginVertical: 10}}>
                <Text style={[styles.field, {marginBottom: 5}]}>
                  Total Serving Time
                </Text>
                <Text style={[styles.value]}>{submission.time_taken}</Text>
              </View>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text style={[styles.name, {fontSize: 13}]}>Total Amount</Text>
                <Text style={[styles.name, {fontSize: 13}]}>
                  ${calcAmount() + parseFloat(invoice.extra_work_charges)}
                </Text>
              </View>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text style={[styles.name, {fontSize: 13}]}>
                  Extra work charge
                </Text>
                <Text style={[styles.name, {fontSize: 13}]}>
                  ${invoice.extra_work_charges ?? 0}
                </Text>
              </View>
              <View
                style={{
                  width: '90%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 10,
                }}>
                <Text style={[styles.name, {fontSize: 13}]}>Amount</Text>
                <Text style={[styles.name, {fontSize: 13}]}>
                  {' '}
                  ${calcAmount()}
                </Text>
              </View>
              <View style={{width: '90%', marginTop: 10}}>
                <MyButton
                  title="Complete Payment"
                  onPress={() =>
                    props.onCompletePayment &&
                    props.onCompletePayment(
                      provider,
                      calcAmount() + parseFloat(invoice.extra_work_charges),
                      booking,
                    )
                  }
                />
              </View>
            </>
          )}
        </ScrollableView>
      </SafeAreaView>
    </BottomCard>
  );
};

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    width: '90%',
    marginBottom: 20,
  },
  categoryNameContainer: {
    flexDirection: 'row',
    width: '90%',
    alignItems: 'center',
  },
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 16,
    color: COLORS.WF_TITLE,
  },
  head: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 18,
    color: COLORS.WF_TITLE,
  },
  value: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.WF_TITLE,
  },
  valueBold: {
    fontFamily: FONTS.P_BOLD,
    fontSize: 20,
    color: COLORS.WF_TITLE,
  },
  field: {
    fontFamily: FONTS.P_Light,
    fontSize: 12,
    color: COLORS.WF_TITLE,
    opacity: 0.5,
  },
  pDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
  },
  avatrNameCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img: {
    height: 80,
    width: '100%',
  },
});
