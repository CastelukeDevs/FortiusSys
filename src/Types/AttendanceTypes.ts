import {IGeolocation} from './GeolocationTypes';

export type ILocation = {
  latitude: number;
  longitude: number;
  geoLocation?: IGeolocation;
};

export type IAttendanceTimeLoc = {
  time: Date;
  location: ILocation;
};

export type IAttendance = {
  id: string;
  checkIn: IAttendanceTimeLoc;
  checkOut: IAttendanceTimeLoc;
  attendanceTime: Date;
};
