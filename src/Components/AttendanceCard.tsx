import FlexSeparator from '@Common/FlexSeparator';
import Icon from '@Common/Icon';
import LinesSeparator from '@Common/LinesSeparator';
import TextPills from '@Common/TextPills';
import {selectUser} from '@Redux/Reducers/UserReducer';
import {IAttendance, IAttendanceTimeLoc} from '@Types/AttendanceTypes';
import {
  Dimens,
  Opacity,
  ThemeColor,
  ThemeText,
} from '@Utilities/Styles/GlobalStyles';
import {getScore} from '@Utilities/Tools/AttendanceScoringTools';
import {ITimeDuration, getDuration} from '@Utilities/Tools/DateTools';
import moment from 'moment';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';

//Render Side content
const TimeLocation = (props: {timeLoc?: IAttendanceTimeLoc}) => {
  const address = props.timeLoc?.location.geoLocation?.address;
  const immediateLocation = address?.building || address?.road;
  // console.log('time parsed', props.timeLoc?.time);
  const formattedTime = moment(props.timeLoc?.time).format('hh:mm');

  return (
    <View style={styles.TimeLocationContainer}>
      <FlexSeparator />
      <Text style={[ThemeText.H3_Bold, {color: ThemeColor.inactive, flex: 1}]}>
        {props.timeLoc ? formattedTime : '--:--'}
      </Text>
      <View style={styles.LocationGroupContainer}>
        <Icon name="location" size={14} color={ThemeColor.active} />
        {props.timeLoc && (
          <Text
            numberOfLines={1}
            style={[ThemeText.SubTitle_Regular, styles.LocationText]}>
            {immediateLocation}
          </Text>
        )}
      </View>
    </View>
  );
};

const DotSeparator = () => (
  <View style={{justifyContent: 'center'}}>
    <View style={styles.DotSeparator} />
  </View>
);

//Render Middle content
const DurationContent = ({duration}: {duration?: ITimeDuration}) => (
  <View style={styles.DurationGroupContainer}>
    {DotSeparator()}
    <View style={{flex: 1}}>
      <Text style={[ThemeText.Title_Bold, styles.DurationText]}>
        {duration === undefined && '-'}
        {duration?.toString()}
      </Text>
      <LinesSeparator dashed />
      <View style={{flex: 1}} />
    </View>
    {DotSeparator()}
  </View>
);

type IAttendanceCardProps = {
  attendance?: IAttendance;
  isWeekend?: boolean;
  onDetailPressed?: (attendance: IAttendance) => void;
};

const AttendanceCard = (prop: IAttendanceCardProps) => {
  const {attendance, isWeekend} = prop;
  const isEmpty = attendance === undefined;

  const user = useSelector(selectUser);

  const duration = getDuration(
    attendance?.checkIn.time!,
    attendance?.checkOut.time!,
  );
  const attendanceScore = getScore(
    attendance?.checkIn.time!,
    attendance?.checkOut.time!,
    isWeekend,
  );

  const onDetailPressHandler = () => {};

  return (
    <View style={styles.RootComponentContainer}>
      <View style={styles.HeaderContainer}>
        {!isEmpty ? (
          <Image source={{uri: attendance.image}} style={styles.Image} />
        ) : (
          <View style={styles.Image} />
        )}

        <View style={styles.HeaderTextGroupContainer}>
          <Text style={[ThemeText.Title_Bold]}>{user?.name}</Text>
          <Text style={[ThemeText.Title_Bold, {color: ThemeColor.inactive}]}>
            {attendance?.id || '-'}
          </Text>
        </View>

        <TextPills text={attendanceScore.score} color={attendanceScore.color} />
      </View>

      <View style={styles.ContentContainer}>
        {TimeLocation({timeLoc: attendance?.checkIn})}
        {DurationContent({duration})}
        {TimeLocation({timeLoc: attendance?.checkOut})}
      </View>

      <LinesSeparator />

      <TouchableOpacity
        style={styles.FooterContainer}
        onPress={() => prop.onDetailPressed?.(attendance!)}
        disabled={isEmpty}>
        <Text
          style={[
            ThemeText.SubTitle_Bold,
            styles.FooterText,
            !attendance && styles.FooterTextNoDetail,
          ]}>
          {attendance ? 'See details' : 'No details'}
        </Text>
        <Icon
          name={attendance ? 'chevron-forward' : 'close'}
          size={24}
          color={attendance ? ThemeColor.active : ThemeColor.inactive}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AttendanceCard;

const styles = StyleSheet.create({
  RootComponentContainer: {
    padding: Dimens.padding * 0.75,
    borderWidth: 1.5,
    borderRadius: Dimens.radius * 3,
    borderColor: ThemeColor.dark + Opacity[20],
    backgroundColor: ThemeColor.light,
  },
  HeaderContainer: {flexDirection: 'row', alignItems: 'center'},
  Image: {
    height: 50,
    width: 50,
    borderRadius: Dimens.radius * 2,
    resizeMode: 'cover',
    backgroundColor: ThemeColor.accent,
  },
  HeaderTextGroupContainer: {
    flex: 3,
    paddingHorizontal: Dimens.padding / 3,
  },
  ContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 100,
  },
  FooterContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  FooterText: {color: ThemeColor.active, textAlignVertical: 'center'},
  FooterTextNoDetail: {color: ThemeColor.inactive, textAlignVertical: 'center'},
  TimeLocationContainer: {
    width: 90,
    alignItems: 'center',
  },
  LocationGroupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  LocationText: {color: ThemeColor.active, flex: 1},
  DotSeparator: {
    width: 6,
    height: 6,
    backgroundColor: ThemeColor.inactive,
    borderRadius: 100,
  },
  DurationGroupContainer: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: Dimens.padding * 0.5,
  },
  DurationText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: ThemeColor.inactive,
    fontStyle: 'italic',
  },
});
