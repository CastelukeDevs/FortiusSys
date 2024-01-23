import React, {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {selectAttendanceHistory} from '@Redux/Reducers/AttendanceReducer';
import {useAppDispatch} from '@Redux/Store';

import {IMainNavProp} from '@Routes/RouteTypes';

import {
  Dimens,
  Opacity,
  ThemeColor,
  ThemeText,
} from '@Utilities/Styles/GlobalStyles';
import {getDateAtRange} from '@Utilities/Tools/DateTools';

import Header from '@Components/Header';
import HeaderAddCalendar from '@Components/HeaderAddCalendar';
import moment from 'moment';
import AttendanceCard from '@Components/AttendanceCard';

const AttendanceListScreen = ({
  navigation,
}: IMainNavProp<'AttendanceListScreen'>) => {
  const inset = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const attendanceHistory = useSelector(selectAttendanceHistory);

  const dateNow = new Date();
  const dateArray = getDateAtRange(dateNow);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedDate = dateArray[selectedIndex];

  const filterAttendance = attendanceHistory.filter(
    history =>
      moment(history.attendanceTime).format('DD-MM-YY') ===
      selectedDate.moment.format('DD-MM-YY'),
  );

  console.log(filterAttendance);

  const onBackHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.RootScreenContainer}>
      <Header onBack={onBackHandler}>
        <HeaderAddCalendar
          dateData={dateArray}
          selected={selectedIndex}
          onDatePress={setSelectedIndex}
        />
      </Header>
      <View style={{padding: Dimens.padding}}>
        <AttendanceCard attendance={attendanceHistory[0]} />
      </View>
      <View style={{padding: Dimens.padding}}>
        <AttendanceCard attendance={undefined} />
      </View>
    </View>
  );
};

export default AttendanceListScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
  },
});
