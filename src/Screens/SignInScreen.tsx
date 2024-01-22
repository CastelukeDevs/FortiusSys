import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {IMainNavProp} from '../Routes/RouteTypes';
import Icon from '../Components/Common/Icon';

const SignInScreen = ({navigation}: IMainNavProp<'SignInScreen'>) => {
  return (
    <View>
      <Text>SignInScreen</Text>
      <Icon name="at" />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});
