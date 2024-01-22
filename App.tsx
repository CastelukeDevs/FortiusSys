import React from 'react';
import {StatusBar} from 'react-native';
import Routes from './src/Routes/Routes';

export default () => (
  <>
    <StatusBar
      translucent
      backgroundColor="transparent"
      barStyle="dark-content"
    />
    <Routes />
  </>
);
