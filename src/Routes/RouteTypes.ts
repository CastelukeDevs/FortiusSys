import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IAttendance} from '@Types/AttendanceTypes';

export type IMainNav = {
  SignInScreen: undefined;
  HomeScreen: undefined;
  AttendanceListScreen: undefined;
  AttendanceDetailScreen: IAttendance;
};

export type IMainNavProp<T extends keyof IMainNav> = NativeStackScreenProps<
  IMainNav,
  T
>;
