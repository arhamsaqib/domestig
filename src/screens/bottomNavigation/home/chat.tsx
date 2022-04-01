import React, {useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {CommonStyles} from '../../../common/styles';
import {Avatar} from '../../../components/avatar';
import {PageNameText} from '../../../components/texts/pageNameText';
import messaging from '@react-native-firebase/messaging';
import {SentMessage} from './components/sentMessage';
import {MyButton} from '../../../components/button';
import {ReceivedMessage} from './components/receivedMessage';
import {MyTextInputWithIcon} from '../../../components/textinputwithicon';
import Icon from 'react-native-vector-icons/Ionicons';
import {FONTS} from '../../../constants/fonts';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS} from '../../../constants/colors';
import {receiveMessages, sendMessage} from '../../../api/messages';
import {MEDIA_URL} from '../../../constants/url';

export const SendButton = (props: {onPress?(): void}) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <LinearGradient
        style={{
          height: 25,
          width: 25,
          borderRadius: 25,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        colors={[COLORS.MAIN_1, COLORS.MAIN_2]}>
        <Icon name="arrow-forward-outline" size={17} color="white" />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export const Chat = ({route, navigation}: any) => {
  const [newMessage, setNewMessage] = useState('');
  const [allMessages, setAllMessages] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    console.log(route.params, 'chat routes');
    setInterval(getData, 3000);
    setLoader(true);
    getData();
  }, []);

  async function getData() {
    const bid = route.params.booking_id;
    const pid = route.params.provider_id;
    const cid = route.params.customer_id;
    const data = {
      booking_id: bid,
      provider_id: pid,
      customer_id: cid,
    };
    const res = await receiveMessages(data).finally(() => setLoader(false));
    console.log(res);
    if (res !== undefined) {
      setAllMessages(res);
    }
    flatListRef.current?.scrollToEnd({animated: true});
  }
  const flatListRef = React.useRef<FlatList>(null);

  // async function requestUserPermission() {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  //   if (enabled) {
  //     console.log('Authorization status:', authStatus);
  //   }
  // }
  const renderMessages = ({item}: any) => {
    return (
      <>
        {item.sent_by === 'provider' && (
          <ReceivedMessage message={item.message} />
        )}
        {item.sent_by === 'customer' && <SentMessage message={item.message} />}
      </>
    );
  };

  async function onSendMessage() {
    const data = {
      booking_id: route.params.booking_id,
      provider_id: route.params.provider_id,
      customer_id: route.params.customer_id,
      message: newMessage,
      sent_by: 'customer',
    };
    const res = await sendMessage(data).finally(() => setNewMessage(''));
    //console.log(res, 'New message response');
  }

  return (
    <SafeAreaView style={[CommonStyles.screenMain]}>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 120 : 25}
        style={{width: '100%', alignItems: 'center'}}>
        <View
          style={[CommonStyles.subView, {marginTop: 10, alignItems: 'center'}]}>
          <Avatar
            customSize
            size={45}
            source={
              route.params.provider_details.avatar && {
                uri: MEDIA_URL + route.params.provider_details.avatar,
              }
            }
          />
          <PageNameText onPress={getData} style={{fontSize: 15}}>
            {route.params.provider_details.name}
          </PageNameText>
        </View>
        <View style={styles.back}>
          <Icon
            onPress={() => navigation.goBack()}
            name="arrow-back-outline"
            color={'black'}
            size={20}
          />
        </View>
        <View style={{width: '90%', marginTop: 10, height: '85%'}}>
          <FlatList
            ref={flatListRef}
            data={allMessages}
            renderItem={renderMessages}
          />
        </View>
        <View style={styles.bottomBar}>
          <View style={[{width: '10%'}, styles.iv]}>
            <Icon name="attach-outline" size={20} />
          </View>
          <View style={[{width: '70%'}, styles.iv]}>
            <TextInput
              style={{fontFamily: FONTS.P_Light, height: 45, width: '100%'}}
              placeholder={'Write your message..'}
              placeholderTextColor={COLORS.MAIN_SUBTEXT}
              onChangeText={setNewMessage}
              value={newMessage}
            />
          </View>
          <View style={[{width: '20%'}, styles.iv]}>
            <SendButton onPress={onSendMessage} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    //alignSelf: 'center',
    // position: 'absolute',
    // bottom: 20,
    // borderWidth: 1,
  },
  iv: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  back: {
    position: 'absolute',
    left: 20,
    top: 25,
  },
});
