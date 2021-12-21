import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONTS} from '../constants/fonts';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends TextInputProps {
  icon?: any;
  name?: string;
}

export const DropDown = (props: Props) => {
  const [show, setShow] = useState(false);
  const {style, secureTextEntry, icon, ...rest} = props;
  return (
    <>
      <TouchableOpacity onPress={() => setShow(!show)} style={styles.main}>
        <View style={styles.iconContainer}>{icon}</View>
        <View style={[styles.ti]}>
          <Text style={styles.name}>{props.name}</Text>
        </View>

        <View style={styles.iconContainer}>
          <Icon name="chevron-down-outline" size={16} />
        </View>
      </TouchableOpacity>
      {show && <View style={styles.card}></View>}
    </>
  );
};

const styles = StyleSheet.create({
  ti: {
    height: 45,
    //padding: 10,
    justifyContent: 'center',
    width: '80%',
  },
  main: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#BCBCBC',
    borderWidth: 1,
    borderRadius: 99,
  },
  iconContainer: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontFamily: FONTS.P_REGULAR,
    fontSize: 15,
    color: COLORS.MAIN_TEXT,
  },
  card: {
    height: 272,
    borderRadius: 10,
    width: '95%',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    //borderWidth: 1,
    backgroundColor: '#F7F8FF',
  },
});
