import {v4 as uuidv4} from 'uuid';
import {createSelector, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IAttendance, IAttendanceTimeLoc} from '@Types/AttendanceTypes';
import AttendanceDummies from '@Utilities/Dummies/AttendanceDummies';

export type IAttendanceInitialState = {
  isReady: boolean;
  isCheckedIn: boolean;
  imageUri?: string;
  checkedInTimeLoc?: IAttendanceTimeLoc;
  lastAttendance?: IAttendance;
  attendanceHistory: IAttendance[];
};

export const attendanceInitialState: IAttendanceInitialState = {
  isReady: true,
  isCheckedIn: false,
  attendanceHistory: [],
  // attendanceHistory: [...(AttendanceDummies as unknown as IAttendance[])],
};

const AttendanceReducer = createSlice({
  name: 'attendance',
  initialState: attendanceInitialState,
  selectors: {
    selectAttendanceReady: state => state.isReady,
    selectAttendanceStatus: state => state.isCheckedIn,
    selectCurrentAttendance: state => state.checkedInTimeLoc,
    selectLastAttendance: state => state.lastAttendance,
    selectAttendanceHistory: state => state.attendanceHistory,
  },
  reducers: {
    resetAttendance: () => ({...attendanceInitialState}),
    checkIn: (state, action: PayloadAction<IAttendanceTimeLoc>) => {
      state.isReady = true;
      state.isCheckedIn = true;
      state.checkedInTimeLoc = action.payload;
    },
    checkOut: (state, action: PayloadAction<IAttendanceTimeLoc>) => {
      state.isCheckedIn = false;
      state.isReady = true;
      const checkOutTimeLoc = action.payload;
      const newID = 'FCSV' + Math.floor(Math.random() * 9999 + 1111).toString();
      console.log('image uri', state.imageUri);

      const newAttendanceRecord: IAttendance = {
        attendanceTime: state.checkedInTimeLoc?.time!,
        checkIn: state.checkedInTimeLoc!,
        image: state.imageUri,
        checkOut: checkOutTimeLoc,
        id: newID,
      };
      state.checkedInTimeLoc = undefined;
      state.imageUri = undefined;
      state.lastAttendance = newAttendanceRecord;
      state.attendanceHistory.push(newAttendanceRecord);
    },
    attendanceLoading: state => {
      state.isReady = false;
    },
    attendanceReady: state => {
      state.isReady = true;
    },
    setImage: (state, action) => {
      state.imageUri = action.payload;
    },
    setAttendanceHistory: (state, action: PayloadAction<IAttendance[]>) => {
      state.attendanceHistory = action.payload;
    },
  },
});

export const {
  selectAttendanceReady,
  selectAttendanceStatus,
  selectCurrentAttendance,
  selectAttendanceHistory,
  selectLastAttendance,
} = AttendanceReducer.selectors;
export const {
  resetAttendance,
  checkIn,
  checkOut,
  attendanceLoading,
  attendanceReady,
  setImage,
  setAttendanceHistory,
} = AttendanceReducer.actions;
export default AttendanceReducer.reducer;
