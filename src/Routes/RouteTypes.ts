import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type IMainNav = {
  SignInScreen: undefined;
  HomeScreen: undefined;
  AttendanceDetailScreen: undefined;
  AttendanceListScreen: undefined;
};

export type IMainNavProp<T extends keyof IMainNav> = NativeStackScreenProps<
  IMainNav,
  T
>;
