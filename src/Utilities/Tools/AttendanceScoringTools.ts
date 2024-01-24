import {ScoreColor, ThemeColor} from '@Utilities/Styles/GlobalStyles';
import {getDuration} from './DateTools';
import moment from 'moment';

enum AttendanceScore {
  'On Time',
  'Early Check Out',
  'Overtime',
  'Late',
  'Weekend',
  'Absent',
}

type IAttendanceScore = keyof typeof AttendanceScore;

type IGetScoreReturns = {
  score: IAttendanceScore;
  color: string;
};

const clockInLimit = 9;
const clockOutLimit = 17;
const durationLimit = 800;

export const getScore = (
  clockIn?: Date,
  clockOut?: Date,
  isHoliday?: boolean,
): IGetScoreReturns => {
  if (isHoliday) {
    return {score: 'Weekend', color: ScoreColor.holiday};
  }
  if (clockIn === undefined || clockOut === undefined) {
    return {score: 'Absent', color: ScoreColor.absent};
  }

  const clockInHour = moment(clockIn).get('hour');
  const clockOutHour = moment(clockOut).get('hour');
  const duration = getDuration(clockIn!, clockOut!);

  const caseECO2 = clockOutHour < clockOutLimit - 1;
  const caseOvertime = duration.elapsedHour() - 100 > durationLimit;
  const caseOvertime2 =
    clockInHour > clockOutLimit || clockOutHour < clockInLimit;
  const caseLate = clockInHour >= clockInLimit;

  if (caseOvertime2) {
    return {score: 'Overtime', color: ScoreColor.overtime};
  }
  if (caseOvertime) {
    return {score: 'Overtime', color: ScoreColor.overtime};
  }
  if (caseECO2) {
    return {score: 'Early Check Out', color: ScoreColor.eco};
  }
  if (caseLate) {
    return {score: 'Late', color: ScoreColor.late};
  }

  return {score: 'On Time', color: ScoreColor.onTime};
};
