import {configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

import reducer from './Reducers/index';
import {useDispatch} from 'react-redux';

const createObserver = require('flipper-redux-observer').default;

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = reducer;

export type IRootStateType = ReturnType<typeof rootReducer>;

const persistedReducer = persistReducer(persistConfig, rootReducer);

const stores = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
    }).concat(createObserver()),
});

const persistor = persistStore(stores);

export type AppDispatch = typeof stores.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export default {stores, persistor};
