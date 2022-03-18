import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {Divider} from './divider';
import {FieldNameText} from './texts/fieldNameText';

interface Props {
  data?: any;
  onSelect?(item?: any): void;
}

export const MultipleOptions = (props: Props) => {
  const renderOption = ({item}: any) => {
    return (
      <>
        <FieldNameText
          onPress={() => props.onSelect && props.onSelect(item)}
          style={styles.txt}>
          {item.description}
        </FieldNameText>
      </>
    );
  };

  return (
    <View style={[styles.main, styles.elevated_card]}>
      <View style={{width: '90%', marginTop: 3}}>
        <FlatList data={props.data} renderItem={renderOption} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    height: 200,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  elevated_card: {
    padding: 10,
    elevation: 2,
    shadowColor: 'rgba(0,0,0, .4)', // IOS
    shadowOffset: {height: 1, width: 1}, // IOS
    shadowOpacity: 1, // IOS
    shadowRadius: 1, //IOS
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
  },
  txt: {
    marginBottom: 5,
  },
});
