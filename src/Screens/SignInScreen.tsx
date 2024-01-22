import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Icon from '@Common/Icon';
import {IMainNavProp} from '@Routes/RouteTypes';

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
