import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {
  DefaultStyle,
  Dimens,
  ThemeColor,
  ThemeText,
} from '@Utilities/Styles/GlobalStyles';
import moment from 'moment';
import Button from '@Common/Button';
import Icon from '@Common/Icon';

const TimeContainer = (props: {isCheckIn?: boolean}) => {
  const label = props.isCheckIn ? 'Check In' : 'Check Out';
  return (
    <View style={styles.TimeContainer}>
      <Text style={ThemeText.SubTitle_Bold}>{label}</Text>
      <View style={{marginVertical: Dimens.padding}}>
        <Icon
          name="remove-circle"
          mode="filled"
          size={20}
          color={ThemeColor.inactive}
        />
      </View>
      <Text style={ThemeText.SubTitle_Bold}>-:-</Text>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="location" size={14} color={ThemeColor.active} />
        <Text style={[ThemeText.Content_Regular, {color: ThemeColor.active}]}>
          -
        </Text>
      </View>
    </View>
  );
};

const CheckInCard = () => {
  const date = new Date();
  const currentDateStr = moment(date).format('ddd, DD MMM YYYY');

  const onCheckInHandler = () => {};

  return (
    <View style={styles.RootComponentContainer}>
      <View style={styles.HeaderContainer}>
        <Text style={[ThemeText.SubTitle_Bold, {flex: 1}]}>
          {currentDateStr}
        </Text>
        <Button label="Check In" onPress={onCheckInHandler} isSmall />
      </View>
      <View style={DefaultStyle.InvisLine} />
      <View style={styles.ContentContainer}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: Dimens.padding,
          }}>
          <TimeContainer isCheckIn />
          <View style={{justifyContent: 'center'}}>
            <Text
              style={[
                ThemeText.SubTitle_Regular,
                {color: ThemeColor.inactive},
              ]}>
              0 hrs 0 mins
            </Text>
            <Text
              style={[
                ThemeText.SubTitle_Regular,
                {color: ThemeColor.active, textAlign: 'center'},
              ]}>
              -
            </Text>
          </View>
          <TimeContainer />
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
  },
  TimeContainer: {
    alignItems: 'center',
  },
});
