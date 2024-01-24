import React from 'react';
import Routes from '@Routes/Routes';
import ReduxWrapper from '@Redux/ReduxWrapper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default () => (
  <GestureHandlerRootView style={{flex: 1}}>
    <ReduxWrapper>
      <Routes />
    </ReduxWrapper>
  </GestureHandlerRootView>
);
