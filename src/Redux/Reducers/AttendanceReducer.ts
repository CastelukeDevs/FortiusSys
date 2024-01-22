import createSliceWithThunks from '@Redux/createSliceWithThunks';
import {IAttendance} from '@Types/AttendanceTypes';

export type IAttendanceInitialState = {
  isCheckedIn: boolean;
  lastAttendance: IAttendance | null;
  attendanceHistory: IAttendance[];
};

export const attendanceInitialState: IAttendanceInitialState = {
  isCheckedIn: false,
  lastAttendance: null,
  attendanceHistory: [],
};

const AttendanceReducer = createSliceWithThunks({
  name: 'attendance',
  initialState: attendanceInitialState,
  //   selectors: {selectStatusBar: state => state.statusBar},
  reducers: create => ({}),
});

export const {} = AttendanceReducer.selectors;
export const {} = AttendanceReducer.actions;
export default AttendanceReducer.reducer;
