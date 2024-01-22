export type ILocation = {
  lat: number;
  lng: number;
  immediateLocation?: string;
};

export type IAttendanceTime = {
  time: Date;
  location: ILocation;
};

export type IAttendance = {
  id: string;
  checkIn: IAttendanceTime;
  checkOut: IAttendanceTime;
  attendanceTime: Date;
};
