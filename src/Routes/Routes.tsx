import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import {IMainNav} from './RouteTypes';

import SignInScreen from '@Screens/SignInScreen';
import HomeScreen from '@Screens/HomeScreen';
import {isUserReady, selectUserToken} from '@Redux/Reducers/UserReducer';

const Stack = createNativeStackNavigator<IMainNav>();

const Routes = () => {
  const userReady = useSelector(isUserReady);
  const userToken = useSelector(selectUserToken);

  const auth = userReady && (userToken !== null || userToken !== undefined);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {!auth ? (
            <Stack.Screen name="SignInScreen" component={SignInScreen} />
          ) : (
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Routes;
