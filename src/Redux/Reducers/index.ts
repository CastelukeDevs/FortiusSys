import {combineReducers} from 'redux';
import DefaultReducer from './DefaultReducer';
import UserReducer from './UserReducer';
import AttendanceReducer from './AttendanceReducer';

export default combineReducers({
  default: DefaultReducer,
  user: UserReducer,
  attendance: AttendanceReducer,
});
