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
import {ICONS} from '../../../../constants/icons';

interface ModalView {
  modalVisibility: boolean;
  onOutsidePress?(): void;
  style?: StyleProp<ViewStyle>;
}

export const DrawerModal: FunctionComponent<ModalView> = ({
  children,
  modalVisibility,
  onOutsidePress,
  style,
}) => {
  return (
    <Modal animationType="fade" visible={modalVisibility} transparent={true}>
      <View style={[styles.modalView1]}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={onOutsidePress}
            style={{
              width: '20%',
              height: '100%',
            }}></TouchableOpacity>
          <View style={[styles.modalView2, style]}>{children}</View>
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
    width: '80%',
    height: '100%',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  arrowDown: {
    width: 40,
    height: 6,
  },
  row: {
    flexDirection: 'row',
    height: '100%',
  },
});
