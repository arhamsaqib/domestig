import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native';
import {RootStateOrAny, useSelector} from 'react-redux';
import {
  getCustomerNotifications,
  updateCustomerNotification,
  deleteCustomerNotifications,
} from '../../../api/customerNotifications';
import {CommonStyles} from '../../../common/styles';
import {BottomCard} from '../../../components/bottomCard';
import {Divider} from '../../../components/divider';
import {GreenCircle} from '../../../components/greenCircle';
import {FieldNameText} from '../../../components/texts/fieldNameText';
import {MainBodyText} from '../../../components/texts/mainBodyText';
import {PageNameText} from '../../../components/texts/pageNameText';
import {TitleText} from '../../../components/texts/titleText';
import {COLORS} from '../../../constants/colors';
import {FONTS} from '../../../constants/fonts';
import {ICONS} from '../../../constants/icons';
import {NotificationCard} from './components/notificationCard';

export const Notification = () => {
  const [notifications, setNotifications]: any = useState([]);
  const [selected, setSelected]: any = useState([]);
  const [showModal, setShowModal] = useState(false);
  const state = useSelector((state: RootStateOrAny) => state.currentUser);
  async function getData() {
    const res = await getCustomerNotifications(state.id);
    if (res !== undefined) {
      setNotifications(res);
    }
    //console.log(res, 'notif');
  }

  function onPress(item: any) {
    setSelected(item);
    setShowModal(true);
  }

  function renderNotifications({item}: any) {
    return (
      <NotificationCard
        title={item.description}
        date={item.created_at}
        onPress={() => onPress(item)}
        read={(item.status === 'read' && true) ?? false}
      />
    );
  }

  useEffect(() => {
    getData();
  }, []);

  async function onMarkRead() {
    const data = {
      status: 'read',
    };
    const res = await updateCustomerNotification(selected.id, data).finally(
      () => {
        setShowModal(false);
        getData();
      },
    );
  }
  async function onDelete() {
    const res = await deleteCustomerNotifications(selected.id).finally(() => {
      setShowModal(false);
      getData();
    });
  }

  return (
    <SafeAreaView style={[CommonStyles.screenMain]}>
      <View style={{marginVertical: 10}} />
      <View
        style={{
          width: '90%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <PageNameText>Notifications</PageNameText>
        <Text onPress={() => {}} style={styles.optionText}>
          Mark all as read
        </Text>
      </View>
      {notifications.length < 1 && (
        <FieldNameText style={{marginTop: 20}}>
          No new notifications
        </FieldNameText>
      )}

      <View style={{marginTop: 10, width: '100%'}}>
        <FlatList data={notifications} renderItem={renderNotifications} />
      </View>
      <BottomCard
        modalVisibility={showModal}
        onOutsidePress={() => setShowModal(false)}>
        <View style={{width: '100%', alignItems: 'center'}}>
          <GreenCircle s50>
            <Image source={ICONS.broom} style={{height: 19.83, width: 13.88}} />
          </GreenCircle>
          <MainBodyText
            style={{
              fontSize: 13,
              color: COLORS.MAIN_TEXT,
              width: '70%',
              textAlign: 'center',
            }}>
            {selected.description}
          </MainBodyText>
          <Divider />
          <View style={{width: '90%', marginTop: 20}}>
            <TouchableOpacity onPress={onMarkRead} style={styles.row}>
              <Image
                source={ICONS.markRead}
                style={{height: 25, width: 25, marginRight: 10}}
              />
              <MainBodyText style={{color: 'black'}}>
                Mark this notification as read
              </MainBodyText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onDelete}
              style={[styles.row, {marginTop: 15}]}>
              <Image
                source={ICONS.bin}
                style={{height: 25, width: 25, marginRight: 10}}
              />
              <MainBodyText style={{color: 'black'}}>
                Delete this notification
              </MainBodyText>
            </TouchableOpacity>
          </View>
        </View>
      </BottomCard>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  optionText: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 13,
    color: '#222222',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
