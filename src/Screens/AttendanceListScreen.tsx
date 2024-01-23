import React, {useEffect, useRef, useState} from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
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
import moment, {Moment} from 'moment';
import AttendanceCard from '@Components/AttendanceCard';
import {sortedHistoryByDate} from '@Utilities/Tools/AttendanceSorter';

const NoAttendanceIndicator = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text style={ThemeText.H3_Light}>No attendance recorded</Text>
  </View>
);

const Separator = () => <View style={{height: Dimens.padding / 2}} />;

const AttendanceListScreen = ({
  navigation,
}: IMainNavProp<'AttendanceListScreen'>) => {
  const width = useWindowDimensions().width;

  const attendanceHistory = useSelector(selectAttendanceHistory);

  const scrollRef = useRef<ScrollView>(null);

  const dateNow = new Date();
  const dateArray = getDateAtRange(dateNow, 10);
  const sortedHistory = sortedHistoryByDate(dateArray, attendanceHistory);

  const [pageIndex, setPageIndex] = useState(dateArray.length - 1);

  const moveToPageIndex = (index: number) => {
    scrollRef.current?.scrollTo({x: index * width});
  };

  useEffect(() => {
    moveToPageIndex(pageIndex);
  }, [pageIndex]);

  const onBackHandler = () => {
    navigation.goBack();
  };

  const ScrollViewOptions = {
    horizontal: true,
    snapToInterval: width,
    decelerationRate: 0,
    bounces: false,
    scrollEventThrottle: 16,
    scrollEnabled: false,
  };

  return (
    <View style={styles.RootScreenContainer}>
      <Header onBack={onBackHandler}>
        <HeaderAddCalendar
          dateData={dateArray}
          selected={pageIndex}
          onDatePress={setPageIndex}
        />
      </Header>

      <ScrollView
        ref={scrollRef}
        style={{flex: 1}}
        onContentSizeChange={() =>
          scrollRef.current?.scrollToEnd({animated: true})
        }
        {...ScrollViewOptions}>
        {sortedHistory.map(item => {
          const attendanceDate = item.date.moment;
          const isWeekend =
            item.date.day === 'Sunday' || item.date.day === 'Saturday';
          const isToday =
            attendanceDate.format('DD-MM-YYYY') ===
            moment(dateNow).format('DD-MM-YYYY');

          return (
            <View
              key={attendanceDate.toString()}
              style={{padding: Dimens.padding, width: width}}>
              <FlatList
                data={item.attendances}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({item: attendanceItem}) => {
                  return <AttendanceCard attendance={attendanceItem} />;
                }}
                ListEmptyComponent={() =>
                  !isToday
                    ? AttendanceCard({isWeekend})
                    : NoAttendanceIndicator()
                }
                ItemSeparatorComponent={() => Separator()}
                showsVerticalScrollIndicator={false}
              />
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default AttendanceListScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
  },
});
