import React, {useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '@Redux/Store';
import {
  resetUserState,
  selectUser,
  selectUserCompany,
  selectUserEmployee,
} from '@Redux/Reducers/UserReducer';
import {statusBarDark, statusBarLight} from '@Redux/Reducers/DefaultReducer';

import {
  Dimens,
  Opacity,
  ThemeColor,
  ThemeText,
} from '@Utilities/Styles/GlobalStyles';

import Logo from '@Common/Logo';
import Button from '@Common/Button';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from '@Common/Icon';
import CheckInCard from '@Components/CheckInCard';
import {
  resetAttendance,
  selectAttendanceStatus,
} from '@Redux/Reducers/AttendanceReducer';

const HomeScreen = () => {
  const inset = useSafeAreaInsets();
  const dispatch = useAppDispatch();

  const user = useSelector(selectUser);
  const employee = useSelector(selectUserEmployee);
  const company = useSelector(selectUserCompany);
  const isSigned = useSelector(selectAttendanceStatus);

  useEffect(() => {
    dispatch(statusBarLight());
    return () => {
      dispatch(statusBarDark());
    };
  }, []);

  const onSignOutHandler = () => {
    dispatch(resetUserState());
  };
  const onResetHandler = () => {
    dispatch(resetAttendance());
  };
  return (
    <View style={styles.RootScreenContainer}>
      <View
        style={[
          styles.HeaderContainer,
          {paddingTop: inset.top + Dimens.padding},
        ]}>
        <View style={styles.BrandingContainer}>
          <View style={styles.LogoContainer}>
            <Logo color={ThemeColor.light} />
          </View>
          <Text
            style={[
              ThemeText.H3_Bold,
              styles.HeaderBrandingText,
              styles.HeaderText,
            ]}>
            FORTIUS
          </Text>
        </View>
        <View style={styles.HeaderTextGroupContainer}>
          <View style={{flex: 1}}>
            <Text style={[ThemeText.Title_Bold, styles.HeaderText]}>
              Hello {employee?.employee_first_name},
            </Text>
            <Text style={[ThemeText.Title_Light, styles.HeaderText]}>
              {user?.role} | {company?.company_name}
            </Text>
          </View>
          <Icon
            name="notifications"
            mode="filled"
            size={24}
            color={ThemeColor.light}
          />
        </View>
      </View>
      <View style={{}}>
        <View style={StyleSheet.absoluteFill}>
          <View style={{flex: 1, backgroundColor: ThemeColor.dark}} />
          <View style={{flex: 1}} />
        </View>
        <View style={{paddingHorizontal: Dimens.padding}}>
          <CheckInCard />
        </View>
      </View>
      <View style={{flex: 1, padding: Dimens.padding, alignItems: 'center'}}>
        <TouchableOpacity style={styles.IconButton}>
          <Icon name="id-card" size={30} color={ThemeColor.accent} />
        </TouchableOpacity>
        <Text style={[ThemeText.SubTitle_Regular]}>Attendance</Text>
      </View>
      <View style={{padding: Dimens.padding}}>
        <Button label="Sign Out" onPress={onSignOutHandler} />
        <Button label="Reset" onPress={onResetHandler} />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  RootScreenContainer: {
    flex: 1,
  },
  HeaderContainer: {
    backgroundColor: ThemeColor.dark,
    padding: Dimens.padding,
  },
  BrandingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  LogoContainer: {
    width: 32,
    height: 32,
  },
  HeaderBrandingText: {
    letterSpacing: 7,
    marginLeft: Dimens.radius,
  },
  HeaderText: {
    color: ThemeColor.light,
  },
  HeaderTextGroupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Dimens.padding * 1.5,
  },
  IconButton: {
    borderWidth: 2,
    borderColor: ThemeColor.accent + Opacity[30],
    borderRadius: Dimens.radius * 2,
    height: 60,
    aspectRatio: 1 / 1,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 13,
    shadowColor: ThemeColor.accent,
    backgroundColor: ThemeColor.light,
    margin: Dimens.padding / 2,
  },
});
