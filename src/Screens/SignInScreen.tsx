import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IMainNavProp} from '../Routes/RouteTypes';

const SignInScreen = ({navigation}: IMainNavProp<'SignInScreen'>) => {
  return (
    <View>
      <Text>SignInScreen</Text>
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
