import React, {FunctionComponent} from 'react';
import {
  Image,
  Modal,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {ICONS} from '../constants/icons';

interface ModalView {
  modalVisibility: boolean;
  onOutsidePress?(): void;
  style?: StyleProp<ViewStyle>;
}

export const BottomCard: FunctionComponent<ModalView> = ({
  children,
  modalVisibility,
  onOutsidePress,
  style,
}) => {
  return (
    <Modal visible={modalVisibility} transparent={true}>
      <View style={[styles.modalView1]}>
        <TouchableOpacity
          onPress={onOutsidePress}
          style={{
            width: '100%',
            height: '100%',
          }}></TouchableOpacity>
        <View style={[styles.modalView2, style]}>
          <TouchableOpacity
            style={{
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
              alignSelf: 'center',
            }}>
            <Image source={ICONS.arrowDown} style={styles.arrowDown} />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalView1: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    //marginBottom: 20,
  },

  modalView2: {
    backgroundColor: 'white',
    width: '100%',
    height: 300,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  arrowDown: {
    width: 40,
    height: 6,
  },
});
