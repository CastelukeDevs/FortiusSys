import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import moment from 'moment';
import {launchCamera} from 'react-native-image-picker';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '@Redux/Store';
import {
  attendanceLoading,
  attendanceReady,
  checkIn,
  checkOut,
  selectAttendanceReady,
  selectAttendanceStatus,
  selectCurrentAttendance,
  selectLastAttendance,
  setImage,
} from '@Redux/Reducers/AttendanceReducer';

import {Dimens, ThemeColor, ThemeText} from '@Utilities/Styles/GlobalStyles';
import {IAttendanceTimeLoc} from '@Types/AttendanceTypes';

import {getLocation} from '@Utilities/Tools/GeoLocation';

import Button from '@Common/Button';
import Icon from '@Common/Icon';
import {PickerOption} from '@Utilities/Settings/ImagePicker';
import {checkAndroidPermission} from '@Utilities/Tools/AndroidPermission';
import LinesSeparator from '@Common/LinesSeparator';
import {getDuration} from '@Utilities/Tools/DateTools';
import {toast} from '@backpackapp-io/react-native-toast';

const TimeContainer = (props: {
  isCheckIn?: boolean;
  timeLoc?: IAttendanceTimeLoc;
}) => {
  const label = props.isCheckIn ? 'Check In' : 'Check Out';

  const userSigned = props.timeLoc !== undefined;
  const address = props.timeLoc?.location.geoLocation?.address;
  const immediateLocation = address?.building || address?.road;

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
          {userSigned ? immediateLocation : '-'}
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

  const currentTime = new Date();
  const currentDateStr = moment(currentTime).format('ddd, DD MMM YYYY');
  const duration = !isUserCheckedIn
    ? getDuration(lastSession?.checkIn.time!, lastSession?.checkOut.time!)
    : getDuration(currentSession?.time!, new Date());

  const getPicture = async () => {
    await checkAndroidPermission('Camera');
    return await launchCamera(PickerOption)
      .then(res => res.assets?.[0].uri)
      .catch(err => {
        console.log('Camera error:', err);
        toast.error('Check in cancelled');
        dispatch(attendanceReady());
      });
  };

  const onCheckInHandler = async () => {
    dispatch(attendanceLoading());

    let imageUri;
    if (!isUserCheckedIn) {
      imageUri = await getPicture();
      dispatch(setImage(imageUri));
    }
    if (imageUri === undefined && !isUserCheckedIn) {
      return dispatch(attendanceReady());
    }
    const geoLoc = await getLocation();
    const time = new Date();
    const newAttendance: IAttendanceTimeLoc = {
      time,
      location: geoLoc,
    };
    console.log('newAttendance', newAttendance);

    if (isUserCheckedIn) {
      toast.success('Check-Out Success');
      return dispatch(checkOut(newAttendance));
    } else {
      toast.success('Check-In Success');
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
      <LinesSeparator />
      <View style={styles.ContentContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {TimeContainer({
            isCheckIn: true,
            timeLoc: currentSession || lastSession?.checkIn,
          })}
          <View style={{justifyContent: 'center'}}>
            <Text style={[ThemeText.SubTitle_Regular, styles.TextDuration]}>
              {duration.toString()}
            </Text>
            <LinesSeparator dashed />
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
    borderRadius: Dimens.radius * 3,
    padding: Dimens.padding * 0.75,
    backgroundColor: ThemeColor.light,
    elevation: 3,
  },
  HeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ContentContainer: {
    justifyContent: 'space-between',
  },
  TimeContainer: {
    alignItems: 'center',
    width: 100,
    // borderWidth: 1,
  },
  TextDuration: {
    color: ThemeColor.inactive,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
