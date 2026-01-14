import { OPEN_WEATHER_API_KEY, OPEN_WEATHER_BASE_URL } from './config';
import type { WeatherNow } from '@/src/types/weather';

type OpenWeatherResponse = {
  coord: {
    lat: number;
    lon: number;
  };
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  }[];
};

export async function fetchWeatherNow(
  lat: number,
  lon: number
): Promise<WeatherNow> {
  const url =
    `${OPEN_WEATHER_BASE_URL}/weather` +
    `?lat=${lat}&lon=${lon}` +
    `&appid=${OPEN_WEATHER_API_KEY}` +
    `&units=metric`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Weather request failed: ${res.status}`);
  }

  const json = (await res.json()) as OpenWeatherResponse;
  const w = json.weather?.[0];

  return {
    temp: Math.round(json.main.temp),
    description: w?.main ?? '—',
    icon: w?.icon ?? '01d',
    lat: json.coord.lat,
    lon: json.coord.lon,
  };
}

export function getWeatherIconUrl(icon: string) {
  return `https://openweathermap.org/img/wn/${icon}@2x.png`;
}
