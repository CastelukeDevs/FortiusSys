import moment, {Moment} from 'moment';
import {IAttendance} from '@Types/AttendanceTypes';
import {ICalendar} from './DateTools';

const filterAttendance = (date: Moment, historyArray: IAttendance[]) =>
  historyArray.filter(
    history =>
      moment(history.attendanceTime).format('DD-MM-YY') ===
      date.format('DD-MM-YY'),
  );

export const sortedHistoryByDate = (
  dateArray: ICalendar[],
  historyArray: IAttendance[],
) =>
  dateArray.map(date => ({
    date,
    attendances: filterAttendance(date.moment, historyArray),
  }));
