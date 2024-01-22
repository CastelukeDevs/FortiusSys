import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '@Redux/Store';

import {
  DefaultStyle,
  Dimens,
  ThemeColor,
  ThemeText,
} from '@Utilities/Styles/GlobalStyles';
import {IAttendanceTimeLoc} from '@Types/AttendanceTypes';

import {getLocation} from '@Utilities/Tools/GeoLocation';

import Button from '@Common/Button';
import Icon from '@Common/Icon';
import {
  attendanceLoading,
  checkIn,
  checkOut,
  selectAttendanceReady,
  selectAttendanceStatus,
  selectCurrentAttendance,
  selectLastAttendance,
} from '@Redux/Reducers/AttendanceReducer';

const TimeContainer = (props: {
  isCheckIn?: boolean;
  timeLoc?: IAttendanceTimeLoc;
}) => {
  const label = props.isCheckIn ? 'Check In' : 'Check Out';

  const userSigned = props.timeLoc !== undefined;
  const immediateBuilding =
    props.timeLoc?.location.geoLocation?.address.building;

  const signTime = userSigned
    ? moment(props.timeLoc?.time).format('hh:mm')
    : '-:-';

  return (
    <View style={styles.TimeContainer}>
      <Text style={ThemeText.SubTitle_Bold}>{label}</Text>
      <View style={{marginVertical: Dimens.padding}}>
        <Icon
          name={userSigned ? 'checkmark-circle' : 'remove-circle'}
          mode="filled"
          size={20}
          color={userSigned ? ThemeColor.success : ThemeColor.inactive}
        />
      </View>
      <Text style={ThemeText.SubTitle_Bold}>{signTime}</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="location" size={14} color={ThemeColor.active} />
        <Text
          numberOfLines={1}
          style={[ThemeText.Content_Regular, {color: ThemeColor.active}]}>
          {userSigned ? immediateBuilding : '-'}
        </Text>
      </View>
    </View>
  );
};

const CheckInCard = () => {
  const dispatch = useAppDispatch();

  const isAttendanceReady = useSelector(selectAttendanceReady);
  const isUserCheckedIn = useSelector(selectAttendanceStatus);
  const currentSession = useSelector(selectCurrentAttendance);
  const lastSession = useSelector(selectLastAttendance);

  const [sessionDuration, setSessionDuration] = useState('-');

  const currentTime = new Date();
  const currentDateStr = moment(currentTime).format('ddd, DD MMM YYYY');
  const duration = moment(currentSession?.time).fromNow();
  const lastSessionDuration = moment(lastSession?.checkIn.time).to(
    lastSession?.checkOut.time,
  );

  useEffect(() => {
    const updateDuration = setInterval(() => {
      setSessionDuration(duration);
    }, 60_000);

    if (isUserCheckedIn) {
      updateDuration;
    } else {
      clearInterval(updateDuration);
    }
    return () => {
      clearInterval(updateDuration);
    };
  }, [isUserCheckedIn]);

  const onCheckInHandler = async () => {
    dispatch(attendanceLoading());
    const geoLoc = await getLocation();
    const time = new Date();
    const newAttendance: IAttendanceTimeLoc = {
      time,
      location: geoLoc,
    };
    console.log('newAttendance', newAttendance);

    if (isUserCheckedIn) {
      return dispatch(checkOut(newAttendance));
    } else {
      return dispatch(checkIn(newAttendance));
    }
  };

  return (
    <View style={styles.RootComponentContainer}>
      <View style={styles.HeaderContainer}>
        <Text style={[ThemeText.SubTitle_Bold, {flex: 1}]}>
          {currentDateStr}
        </Text>
        <Button
          label={isUserCheckedIn ? 'Check Out' : 'Check In'}
          onPress={onCheckInHandler}
          isSmall
          disabled={!isAttendanceReady}
        />
      </View>
      <View style={DefaultStyle.InvisLine} />
      <View style={styles.ContentContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: Dimens.padding,
          }}>
          {TimeContainer({
            isCheckIn: true,
            timeLoc: currentSession || lastSession?.checkIn,
          })}
          {/* <TimeContainer isCheckIn timeLoc={currentSession} /> */}
          <View style={{justifyContent: 'center'}}>
            <Text
              style={[
                ThemeText.SubTitle_Regular,
                {color: ThemeColor.inactive},
              ]}>
              {isUserCheckedIn ? sessionDuration : lastSessionDuration}
            </Text>
            <Text
              style={[
                ThemeText.SubTitle_Regular,
                {color: ThemeColor.active, textAlign: 'center'},
              ]}>
              - - - - - - - -
            </Text>
          </View>
          {TimeContainer({
            isCheckIn: false,
            timeLoc: !isUserCheckedIn ? lastSession?.checkOut : undefined,
          })}
        </View>
      </View>
    </View>
  );
};

export default CheckInCard;

const styles = StyleSheet.create({
  RootComponentContainer: {
    // borderWidth: 1,
    borderRadius: Dimens.radius * 3,
    padding: Dimens.padding * 0.75,
    backgroundColor: ThemeColor.light,
    elevation: 3,
  },
  HeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Dimens.padding,
  },
  ContentContainer: {
    marginTop: Dimens.padding,
    justifyContent: 'space-between',
  },
  TimeContainer: {
    alignItems: 'center',
    width: 100,
  },
});
