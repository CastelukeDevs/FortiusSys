import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type IMainNav = {
  SignInScreen: undefined;
  HomeScreen: undefined;
  AttendanceScreen: undefined;
  AttendanceList: undefined;
};

export type IMainNavProp<T extends keyof IMainNav> = NativeStackScreenProps<
  IMainNav,
  T
>;
