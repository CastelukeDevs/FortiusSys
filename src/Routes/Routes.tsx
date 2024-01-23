import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import {IMainNav} from './RouteTypes';

import SignInScreen from '@Screens/SignInScreen';
import HomeScreen from '@Screens/HomeScreen';
import {isUserReady, selectUserToken} from '@Redux/Reducers/UserReducer';
import {PermissionsAndroid, StatusBar} from 'react-native';
import {selectStatusBar} from '@Redux/Reducers/DefaultReducer';
import {androidInitialPermissionCheck} from '@Utilities/Tools/AndroidPermission';
import AttendanceListScreen from '@Screens/AttendanceListScreen';
import AttendanceDetailScreen from '@Screens/AttendanceDetailScreen';
import SettingsScreen from '@Screens/SettingsScreen';

const Stack = createNativeStackNavigator<IMainNav>();

const Routes = () => {
  // const userReady = useSelector(isUserReady);
  const userToken = useSelector(selectUserToken);
  const barStyle = useSelector(selectStatusBar);

  const [auth, setAuth] = useState(false);

  const checkPermission = async () => {
    const fineLocation = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    const coarseLocation = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
    );

    console.log('permission', {fineLocation, coarseLocation});
  };

  useEffect(() => {
    androidInitialPermissionCheck();
  }, []);

  useEffect(() => {
    if (userToken === null || userToken === undefined) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  }, [userToken]);

  return (
    <SafeAreaProvider>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={barStyle}
      />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!auth ? (
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
          ) : (
            <>
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen
                name="AttendanceListScreen"
                component={AttendanceListScreen}
              />
              <Stack.Screen
                name="AttendanceDetailScreen"
                component={AttendanceDetailScreen}
              />
              <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Routes;
