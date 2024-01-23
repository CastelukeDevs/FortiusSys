import moment, {Moment} from 'moment';

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
] as const;

const dayNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
] as const;

type IDayName = (typeof dayNames)[number];

export type ICalendar = {
  date: number;
  month: string;
  day: IDayName;
  year: number;
  moment: Moment;
};

export const extractDateData = (momentDate: Moment): ICalendar => {
  return {
    date: momentDate.get('date'),
    day: dayNames[momentDate.get('day')],
    month: monthNames[momentDate.get('month')],
    year: momentDate.get('year'),
    moment: momentDate,
  };
};

export const getDateAtRange = (current: Date, range?: number) => {
  const extDate = extractDateData(moment(current));
  let dateArray: ICalendar[] = [extDate];

  const dateRange = range || 5;
  for (let day = 1; dateRange >= dateArray.length; day++) {
    const selectDate = moment(current).subtract(day, 'd');
    dateArray.push(extractDateData(selectDate));
  }
  const sorted = dateArray.sort((a, b) => a.date - b.date);
  return sorted;
};

export type ITimeDuration = {
  days?: number;
  hours?: number;
  minutes?: number;
  toString: (withSecond?: boolean) => string;
  elapsedHour: () => number;
};
/**
 * Getting all duration between two dates
 * @param clockIn
 * @param clockOut
 * @returns days number
 * @returns hours number
 * @returns minutes number
 * @returns seconds number
 * @returns toString function
 * @returns elapsedHour function
 */
export const getDuration = (clockIn: Date, clockOut: Date): ITimeDuration => {
  const clockInMom = moment(clockIn);
  const clockOutMom = moment(clockOut);
  const momentDuration = moment.duration(clockOutMom.diff(clockInMom));
  const days = momentDuration.days();
  const hours = momentDuration.hours();
  const minutes = momentDuration.minutes();
  const seconds = momentDuration.seconds();

  const duration = {
    days: days > 0 ? days : undefined,
    hours: hours > 0 ? hours : undefined,
    minutes: minutes > 0 ? minutes : undefined,
    seconds: seconds > 0 ? seconds : undefined,
  };

  return {
    ...duration,
    toString: (withSec?: boolean) => {
      return (
        (duration.days
          ? `${duration.days} ${duration.days > 1 ? 'days' : 'day'} `
          : '') +
        (duration.hours
          ? `${duration.hours} ${duration.hours > 1 ? 'hrs' : 'hr'} `
          : '') +
        (duration.minutes
          ? `${duration.minutes} ${duration.minutes > 1 ? 'mins' : 'min'} `
          : '') +
        (duration.seconds && withSec
          ? `${duration.seconds} ${duration.seconds > 1 ? 'secs' : 'sec'}`
          : '')
      );
    },
    elapsedHour: () => {
      return days * 10_000 + hours * 100 + minutes + seconds / 100;
    },
  };
};
