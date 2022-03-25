import React, {useEffect, useState} from 'react';
import {BottomCard} from '../../../../components/bottomCard';
import {Calendar} from 'react-native-calendars';
import {PageNameText} from '../../../../components/texts/pageNameText';
import {Alert, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FONTS} from '../../../../constants/fonts';
import {COLORS} from '../../../../constants/colors';
import {MyTextInput} from '../../../../components/textinput';
import {MyButton} from '../../../../components/button';
import {TimeInput} from '../../../../components/timeInput';
import {FieldNameText} from '../../../../components/texts/fieldNameText';
import {ConvertDateToObject} from '../../../../helpers/convertDateTobject';

interface Props {
  onOutsidePress?(): void;
  modalVisibility: boolean;
  time?(t?: string): void;
  date?(d?: string): void;
  onScheduleNowPress?(d: any): void;
}

const AmPmSwitch = (props: {value?(v: string): void}) => {
  const [state, setState] = useState('pm');
  function onPress() {
    if (state === 'am') {
      setState('pm');
      props.value && props.value('pm');
    }
    if (state === 'pm') {
      setState('am');
      props.value && props.value('am');
    }
  }
  return (
    <TouchableOpacity onPress={onPress} style={styles.switchMain}>
      <View style={[styles.inactiveBox, state === 'am' && styles.activeBox]}>
        <Text
          style={[styles.inactivetext, state === 'am' && styles.activeText]}>
          AM
        </Text>
      </View>
      <View style={[styles.inactiveBox, state === 'pm' && styles.activeBox]}>
        <Text
          style={[styles.inactivetext, state === 'pm' && styles.activeText]}>
          PM
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export const CalendarComponet = (props: Props) => {
  const today: any = new Date();
  const [selected, setSelected]: any = useState(new Date());
  const [time, setTime]: any = useState('');
  const [zone, setZone]: any = useState('');
  function onDateSelect(item: any) {
    console.log('daypressed');
    const s = new Date(item.dateString);
    setSelected(s);
    //console.log(item, 'selected');
  }
  const x = ConvertDateToObject(selected);
  useEffect(() => {}, [selected]);
  function onPress() {
    const data = {
      date: selected,
      time: time + ' ' + zone,
    };
    props.onScheduleNowPress && props.onScheduleNowPress(data);
  }
  return (
    <BottomCard
      onOutsidePress={props.onOutsidePress}
      style={{height: '70%'}}
      modalVisibility={props.modalVisibility}>
      <View style={{width: '90%', alignSelf: 'center'}}>
        <PageNameText>Select Date</PageNameText>
      </View>
      <Calendar
        //current={selected.toDateString()}
        minDate={today.toLocaleDateString()}
        theme={{
          arrowColor: 'black',
          selectedDayTextColor: 'red',
          // //   selectedDayBackgroundColor: COLORS.MAIN_1,
          todayTextColor: 'blue',
          // selectedDayBackgroundColor: 'red',
        }}
        onDayPress={onDateSelect}
      />
      <FieldNameText style={{width: '90%', alignSelf: 'center'}}>
        {x.date} {x.month} {x.year}
      </FieldNameText>
      <View
        style={{
          width: '90%',
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginTop: 30,
        }}>
        <View style={{width: '20%', justifyContent: 'center'}}>
          <PageNameText>Time</PageNameText>
        </View>
        <View
          style={{
            width: '70%',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TimeInput style={{width: '40%'}} time={setTime} />
          <View style={{width: '50%'}}>
            <AmPmSwitch value={setZone} />
          </View>
        </View>
      </View>
      <View style={{width: '90%', alignSelf: 'center', marginTop: 30}}>
        <MyButton title="Schedule Now" onPress={onPress} />
      </View>
    </BottomCard>
  );
};

const styles = StyleSheet.create({
  switchMain: {
    height: 47,
    borderRadius: 10,
    width: '100%',
    //borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.MAIN_1,
  },
  inactiveBox: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    backgroundColor: '#e1e1e1',
    borderRadius: 10,
  },
  activeText: {
    fontFamily: FONTS.P_MEDIUM,
    fontSize: 18,
    color: 'white',
  },
  inactivetext: {
    color: COLORS.MAIN_BODYTEXT,
  },
  activeBox: {
    backgroundColor: COLORS.MAIN_1,
    borderRadius: 10,
  },
});
