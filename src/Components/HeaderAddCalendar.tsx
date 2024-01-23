import React, {useRef} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {
  Dimens,
  Opacity,
  ThemeColor,
  ThemeText,
} from '@Utilities/Styles/GlobalStyles';
import LinearGradient from 'react-native-linear-gradient';

import {ICalendar} from '@Utilities/Tools/DateTools';

type IHeaderAddCalendarProps = {
  selected: number;
  onDatePress: (index: number) => void;
  dateData: ICalendar[];
};
const HeaderAddCalendar = (props: IHeaderAddCalendarProps) => {
  const selectedDate = props.dateData[props.selected];

  const flatListRef = useRef<FlatList>(null);

  const GradientColorArr = [
    ThemeColor.dark + Opacity[5],
    ThemeColor.dark + Opacity[0],
  ];

  return (
    <View style={styles.RootComponentContainer}>
      <Text style={[ThemeText.Hero_Bold]}>{selectedDate.date}</Text>
      <View style={styles.HeroContainer}>
        <Text style={[ThemeText.SubTitle_Bold]}>
          {selectedDate.day.slice(0, 3)}
        </Text>
        <Text style={[ThemeText.Content_Regular]}>
          {selectedDate.month.slice(0, 3)} {selectedDate.year}
        </Text>
      </View>
      <View style={styles.DateSelectionContainer}>
        <LinearGradient
          style={StyleSheet.absoluteFillObject}
          colors={GradientColorArr}
          start={{x: 0, y: 0}}
          end={{x: 0.2, y: 0}}
        />
        <FlatList
          ref={flatListRef}
          onContentSizeChange={() =>
            flatListRef.current?.scrollToOffset({
              animated: true,
              offset: 50 * props.dateData.length,
            })
          }
          horizontal
          data={props.dateData}
          keyExtractor={date => date.moment.toString()}
          renderItem={({item, index}) => {
            const isSelected = props.selected === index;
            return (
              <TouchableOpacity
                onPress={() => props.onDatePress(index)}
                disabled={isSelected}
                style={[
                  styles.DateItemContainer,
                  isSelected && styles.DateItemSelected,
                ]}>
                <Text
                  style={[
                    ThemeText.Title_Regular,
                    {
                      color: isSelected
                        ? ThemeColor.active
                        : ThemeColor.inactive,
                    },
                  ]}>
                  {item.day.slice(0, 1)}
                </Text>
                <Text
                  style={[
                    ThemeText.SubTitle_Bold,
                    {color: isSelected ? ThemeColor.active : ThemeColor.dark},
                  ]}>
                  {item.date}
                </Text>
              </TouchableOpacity>
            );
          }}
          // bounces={false}
          showsHorizontalScrollIndicator={false}
          style={{
            flex: 1,
          }}
          contentContainerStyle={styles.FlatlistContentContainer}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  RootComponentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Dimens.padding,
    paddingTop: 0,
  },
  HeroContainer: {marginLeft: Dimens.padding / 3, marginRight: Dimens.padding},
  DateSelectionContainer: {
    flex: 1,
    borderLeftWidth: 2,
    borderColor: ThemeColor.dark + Opacity[10],
  },
  DateItemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: Dimens.padding,
    // paddingVertical: Dimens.padding / 3,
    height: 53,
    width: 50,
  },
  DateItemSelected: {
    borderWidth: 2,
    borderColor: ThemeColor.active + Opacity[30],
    borderRadius: Dimens.radius * 2,
  },
  FlatlistContentContainer: {paddingHorizontal: Dimens.padding / 4},
});
export default HeaderAddCalendar;
