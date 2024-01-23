import GetLocation from 'react-native-get-location';
import APICall from '@Utilities/APIs/APICall';
import {IGeolocation, IGeolocationParams} from '@Types/GeolocationTypes';
import {ILocation} from '@Types/AttendanceTypes';

//TODO: Obfuscate or save to .env in production, not necessary for now
const API_KEY = '65aea6e1e8d17153587334kfwe14aea';

export const reverseGeoLoc = async (
  coordinates: ILocation,
): Promise<IGeolocation> => {
  const ApiCallParams: IGeolocationParams = {
    api_key: API_KEY,
    lat: coordinates.latitude,
    lon: coordinates.longitude,
  };
  const geoloc = await APICall('GET_GEOLOC', {params: ApiCallParams});

  //   console.log('[GeoLocation] => ', geoloc);
  return geoloc as unknown as IGeolocation;
};

export const getLocation = async (): Promise<ILocation> => {
  return await GetLocation.getCurrentPosition({
    enableHighAccuracy: true,
    timeout: 60000,
  })
    .then(async location => {
      const coordinates: ILocation = {
        latitude: location.latitude,
        longitude: location.longitude,
      };
      //   console.log('[GeoLocation] => ', coordinates);
      const geoLoc = await reverseGeoLoc(coordinates);
      coordinates.geoLocation = geoLoc;

      return coordinates;
    })
    .catch(error => {
      const {code, message} = error;
      console.warn('[GeoLocation] => error:', {code, message});
      return {latitude: 0, longitude: 0};
    });
};
