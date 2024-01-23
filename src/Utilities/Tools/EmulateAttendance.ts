import moment from 'moment';
import {ICalendar, getDateAtRange} from './DateTools';
import {IAttendance} from '@Types/AttendanceTypes';

const AttendanceTemplate = {
  //Simulate ECO ///////////////
  attendanceTime: '2024-01-17T01:55:26.000Z',
  id: 'ECO_0',
  image:
    'file:///data/user/0/com.fortiussys/cache/rn_image_picker_lib_temp_2bb7fd37-dc85-4c2d-a851-403cda833770.jpg',
  checkIn: {
    time: '2024-01-17T01:55:26.000Z',
    location: {
      latitude: 37.421998,
      longitude: -122.084,
      geoLocation: {
        display_name:
          'Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States',
        lat: '37.42236555',
        lon: '-122.08414601465464',
        address: {
          building: 'Google Building 40',
          city: 'Mountain View',
          country: 'United States',
          country_code: 'us',
          county: 'Santa Clara County',
          postcode: '94043',
          road: 'Amphitheatre Parkway',
          state: 'California',
        },
      },
    },
  },
  checkOut: {
    time: '2024-01-17T08:54:32.000Z',
    location: {
      latitude: 37.421998,
      longitude: -122.084,
      geoLocation: {
        display_name:
          'Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States',
        lat: '37.42236555',
        lon: '-122.08414601465464',
        address: {
          building: 'Google Building 40',
          city: 'Mountain View',
          country: 'United States',
          country_code: 'us',
          county: 'Santa Clara County',
          postcode: '94043',
          road: 'Amphitheatre Parkway',
          state: 'California',
        },
      },
    },
  },
};

const LocationPool = [
  'Main Office',
  'Branch Building',
  'Office RND Labs',
  'Home',
  'Morgan BVD',
];
const ImageUrlPool = [
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1541823709867-1b206113eafd?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  'https://images.unsplash.com/photo-1508835277982-1c1b0e205603?q=80&w=200&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const RandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const getNewTime = (date: ICalendar, isIn: boolean) => {
  const randomSignInHour = RandomNumber(7, 9);
  const randomSignOutHour = RandomNumber(15, 18);
  const minutes = RandomNumber(0, 59);

  const hour = isIn ? randomSignInHour : randomSignOutHour;

  const newMomentString = `${date.year}-${date.month}-${date.date} ${hour}:${minutes}:00+07:00`;
  const momentParseFormat = 'YYYY-MMMM-DD hh:mm:ssZ ZZ';

  const newDate = moment(newMomentString, momentParseFormat);

  return newDate.toDate();
};

const generateNewAttendance = (calendar: ICalendar) => {
  //   console.log('Generating date', date.format('DD MM | hh:mm'));

  const newID = 'GENE' + RandomNumber(1111, 9999);
  const LSII = RandomNumber(0, 4); //LocationSignInIndex
  const LSOI = RandomNumber(0, 4); //LocationSignOutIndex
  const ImageIndex = RandomNumber(0, 5);

  const signInTime = getNewTime(calendar, true);
  const signOutTime = getNewTime(calendar, false);

  const newAttendance: IAttendance = {
    id: newID,
    attendanceTime: signInTime,
    image: ImageUrlPool[ImageIndex],
    checkIn: {
      time: signInTime,
      location: {
        ...AttendanceTemplate.checkIn.location,
        geoLocation: {
          ...AttendanceTemplate.checkIn.location.geoLocation,
          address: {
            ...AttendanceTemplate.checkIn.location.geoLocation.address,
            building: LocationPool[LSII],
          },
        },
      },
    },
    checkOut: {
      time: signOutTime,
      location: {
        ...AttendanceTemplate.checkIn.location,
        geoLocation: {
          ...AttendanceTemplate.checkIn.location.geoLocation,
          address: {
            ...AttendanceTemplate.checkIn.location.geoLocation.address,
            building: LocationPool[LSOI],
          },
        },
      },
    },
  };

  return newAttendance as unknown as IAttendance;
};

export const EmulateAttendance = (): IAttendance[] => {
  const dateNow = new Date();
  const dateArray = getDateAtRange(dateNow, 10);
  let attendanceArray: IAttendance[] = [];
  dateArray.forEach(date => {
    const count = RandomNumber(1, 3);

    for (let i = 1; i <= count; i++) {
      const newAttendance = generateNewAttendance(date);
      attendanceArray.push(newAttendance);
    }
  });

  return attendanceArray;
};
