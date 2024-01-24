import React from 'react';
import {Text, View} from 'react-native';
import {useAppDispatch} from '@Redux/Store';
import {
  resetAttendance,
  setAttendanceHistory,
} from '@Redux/Reducers/AttendanceReducer';

import Button from '@Common/Button';
import Header from '@Components/Header';
import {EmulateAttendance} from '@Utilities/Tools/EmulateAttendance';
import {Dimens} from '@Utilities/Styles/GlobalStyles';

const SettingsScreen = () => {
  const dispatch = useAppDispatch();

  const onResetAttendanceHandler = () => {
    dispatch(resetAttendance());
  };

  const onGenerateAttendanceHandler = () => {
    dispatch(resetAttendance());
    const attendance = EmulateAttendance();
    dispatch(setAttendanceHistory(attendance));
  };

  return (
    <View>
      <Header label="Settings" />
      <View style={{padding: Dimens.padding}}>
        <Button label="Reset Attendance" onPress={onResetAttendanceHandler} />

        <Button
          label="Reset and Generate Attendance"
          onPress={onGenerateAttendanceHandler}
          style={{marginTop: Dimens.padding}}
        />
        <View style={{alignItems: 'center'}}>
          <Text>Generating new attendance for all date</Text>
          <Text>no absence or weekend status</Text>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;
