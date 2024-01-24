import React, {ReactNode} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Store from './Store';

/**
 * Wrapper for redux
 */
export default ({children}: {children: ReactNode[] | ReactNode}) => (
  <Provider store={Store.stores}>
    <PersistGate persistor={Store.persistor}>{children}</PersistGate>
  </Provider>
);
