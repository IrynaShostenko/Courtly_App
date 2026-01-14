export type City = {
  name: string;
  lat: number;
  lon: number;
};

export const CITIES = {
  STUTTGART: {
    name: 'Stuttgart',
    lat: 48.7758,
    lon: 9.1829,
  },
  KYIV: {
    name: 'Kyiv',
    lat: 50.4501,
    lon: 30.5234,
  },
  ODESA: {
    name: 'Odesa',
    lat: 46.4825,
    lon: 30.7233,
  },
} as const;
