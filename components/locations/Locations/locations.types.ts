export interface LocationTag {
  en: string;
  ar: string;
}

export interface LocationNote {
  en: string;
  ar: string;
}

export interface LocationCoords {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;

  name: string;
  name_ar: string;

  addr: string;
  addr_ar: string;

  hours: string;
  hours_ar: string;

  tag: LocationTag;

  img: string;

  features: string[];

  deliveryPlatforms: string[];

  note: LocationNote;

  coords: LocationCoords;

  googleMaps: string;
}