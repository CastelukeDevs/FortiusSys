import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {selectUser} from '@Redux/Reducers/UserReducer';
import {selectAttendanceHistory} from '@Redux/Reducers/AttendanceReducer';

import {IMainNavProp} from '@Routes/RouteTypes';

import {getDuration} from '@Utilities/Tools/DateTools';
import {getScore} from '@Utilities/Tools/AttendanceScoringTools';

import {IAttendanceTimeLoc} from '@Types/AttendanceTypes';

import {
  Dimens,
  Opacity,
  ThemeColor,
  ThemeText,
} from '@Utilities/Styles/GlobalStyles';
import Icon from '@Common/Icon';
import LinesSeparator from '@Common/LinesSeparator';
import Header from '@Components/Header';

const dateFormat = 'DD MMMM YYYY';

const AttendanceDetailScreen = ({
  navigation,
  route,
}: IMainNavProp<'AttendanceDetailScreen'>) => {
  const attendance = route.params;
  const user = useSelector(selectUser);
  const attendanceList = useSelector(selectAttendanceHistory).filter(
    att =>
      moment(att.attendanceTime).format(dateFormat) ===
      moment(new Date()).format(dateFormat),
  );

  const attendanceTime = moment(attendance.attendanceTime).format(dateFormat);
  const attendanceStatus = getScore(
    attendance.checkIn.time,
    attendance.checkOut.time,
  );
  const attendanceDuration = getDuration(
    attendance.checkIn.time,
    attendance.checkOut.time,
  );

  const getLocation = (timeLoc: IAttendanceTimeLoc) => {
    const address = timeLoc.location.geoLocation?.address;
    return address?.building || address?.road;
  };
  return (
    <View style={styles.RootScreenContainer}>
      <Header label="Attendance Details" />

      <View style={styles.ContentHeaderContainer}>
        <View style={{alignItems: 'center'}}>
          <Image source={{uri: attendance.image}} style={styles.ImageStyle} />
          <View style={styles.HeaderTextGroup}>
            <Text style={ThemeText.H3_Bold}>{user?.name}</Text>
            <Text style={[ThemeText.Title_Bold, {color: ThemeColor.inactive}]}>
              {attendance.id}
            </Text>
          </View>
        </View>
        <View>
          <View style={styles.TextContainer}>
            <Text style={styles.TextLeft}>Total Check In</Text>
            <Text style={styles.TextRight}>
              {attendanceList.length} Check In(s)
            </Text>
          </View>
          <View style={styles.TextContainer}>
            <Text style={styles.TextLeft}>Date</Text>
            <Text style={styles.TextRight}>{attendanceTime}</Text>
          </View>
          <View style={styles.TextContainer}>
            <Text style={styles.TextLeft}>Status</Text>
            <Text style={styles.TextRight}>{attendanceStatus.score}</Text>
          </View>
        </View>
      </View>

      <View style={styles.ContentContainer}>
        <LinearGradient
          style={StyleSheet.absoluteFillObject}
          colors={[ThemeColor.dark + Opacity[5], ThemeColor.light]}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.1}}
        />
        <View style={styles.TextContainer}>
          <Text style={styles.TextLeft}>Duration</Text>
          <Text style={styles.TextRight}>
            {attendanceDuration.toString(true)}
          </Text>
        </View>

        <LinesSeparator />

        <View style={styles.TextContainer}>
          <Text style={styles.TextLeft}>Check In Time</Text>
          <Text style={styles.TextRight}>
            {moment(attendance.checkIn.time).format('hh:mm')}
          </Text>
        </View>
        <View style={styles.TextContainer}>
          <Text style={styles.TextLeft}>Location</Text>
          <View style={styles.LocationTextGroup}>
            <Icon name="location" size={20} style={styles.LocationColor} />
            <Text style={[styles.TextRight, styles.LocationColor]}>
              {getLocation(attendance.checkIn)}
            </Text>
          </View>
        </View>

        <LinesSeparator />

        <View style={styles.TextContainer}>
          <Text style={styles.TextLeft}>Check Out Time</Text>
          <Text style={styles.TextRight}>
            {moment(attendance.checkOut.time).format('hh:mm')}
          </Text>
        </View>
        <View style={styles.TextContainer}>
          <Text style={styles.TextLeft}>Location</Text>
          <View style={styles.LocationTextGroup}>
            <Icon name="location" size={20} style={styles.LocationColor} />
            <Text style={[styles.TextRight, styles.LocationColor]}>
              {getLocation(attendance.checkOut)}
            </Text>
          </View>
        </View>
        <View style={styles.TextContainer}>
          <Text style={styles.TextLeft}>Cross Day</Text>
          <Text style={styles.TextRight}>
            {attendanceDuration.days || 1} day(s)
          </Text>
        </View>

        <LinesSeparator />
      </View>
    </View>
  );
};

export default AttendanceDetailScreen;

const styles = StyleSheet.create({
  LocationColor: {
    color: ThemeColor.active,
  },
  RootScreenContainer: {flex: 1},
  ContentHeaderContainer: {
    backgroundColor: ThemeColor.light,
    padding: Dimens.padding,
  },
  ImageStyle: {
    width: 85,
    height: 85,
    borderRadius: Dimens.radius * 3,
  },
  HeaderTextGroup: {alignItems: 'center', marginVertical: Dimens.padding / 2},
  TextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: Dimens.padding / 6,
  },
  TextLeft: {
    ...ThemeText.Title_Bold,
  },
  TextRight: {
    ...ThemeText.Title_Regular,
    color: ThemeColor.dark + Opacity[75],
    alignItems: 'center',
  },
  ContentContainer: {
    padding: Dimens.padding,
    flex: 1,
    backgroundColor: ThemeColor.light,
  },
  LocationTextGroup: {flexDirection: 'row', alignItems: 'center'},
});
