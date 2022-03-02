export interface IPlace {
  name: string;
  longitude: string;
  latitude: string;
  state: string;
  state_abb: string;
}

export interface IAddress {
  country: string;
  country_abb: string;
  places: IPlace[];
}

export interface ICountry {
  value: string;
  label: string;
}
