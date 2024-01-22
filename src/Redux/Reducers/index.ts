import {combineReducers} from 'redux';
import DefaultReducer from './DefaultReducer';
import UserReducer from './UserReducer';

export default combineReducers({
  default: DefaultReducer,
  user: UserReducer,
});
