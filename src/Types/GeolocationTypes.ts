const GeolocationExampleData = {
  place_id: 287192750,
  licence:
    'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
  osm_type: 'way',
  osm_id: 23733663,
  lat: '37.42236555',
  lon: '-122.08414601465464',
  display_name:
    'Google Building 40, Amphitheatre Parkway, Mountain View, Santa Clara County, California, 94043, United States',
  address: {
    building: 'Google Building 40',
    road: 'Amphitheatre Parkway',
    city: 'Mountain View',
    county: 'Santa Clara County',
    state: 'California',
    'ISO3166-2-lvl4': 'US-CA',
    postcode: '94043',
    country: 'United States',
    country_code: 'us',
  },
  boundingbox: ['37.4220644', '37.422683', '-122.0849617', '-122.0827584'],
};

export type IGeoAddress = {
  building: string;
  road: string;
  city: string;
  county: string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
};

export type IGeolocation = {
  lat: string;
  lon: string;
  display_name: string;
  address: IGeoAddress;
};

export type IGeolocationParams = {
  api_key?: string;
  lat: number;
  lon: number;
};
