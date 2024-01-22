import React from 'react';
import {StatusBar} from 'react-native';
import Routes from '@Routes/Routes';
import ReduxWrapper from '@Redux/ReduxWrapper';

export default () => (
  <ReduxWrapper>
    <StatusBar
      translucent
      backgroundColor="transparent"
      barStyle="dark-content"
    />
    <Routes />
  </ReduxWrapper>
);
