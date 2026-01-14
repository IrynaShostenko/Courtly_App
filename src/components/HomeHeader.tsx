import { useEffect, useMemo, useState } from 'react';
import {
    ActivityIndicator,
    Image,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import { fetchWeatherNow, getWeatherIconUrl } from '@/src/api/weather';
import type { City } from '@/src/constants/cities';
import type { WeatherNow } from '@/src/types/weather';

import { COLORS } from '@/src/constants/colors';
import { SPACING } from '@/src/constants/spacing';
import { TYPOGRAPHY } from '@/src/constants/typography';

type Props = {
  city: City;
  name?: string;
};

export default function HomeHeader({ city, name }: Props) {
  const [weather, setWeather] = useState<WeatherNow | null>(null);
  const [loadingWeather, setLoadingWeather] = useState(true);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    fetchWeatherNow(city.lat, city.lon)
      .then(setWeather)
      .catch((e) =>
        setWeatherError(e instanceof Error ? e.message : 'Unknown error')
      )
      .finally(() => setLoadingWeather(false));
  }, [city.lat, city.lon]);

  const dateText = useMemo(() => {
    const d = new Date();
    const weekday = d.toLocaleDateString('en-US', { weekday: 'long' });
    const day = d.toLocaleDateString('en-US', { day: '2-digit' });
    const month = d.toLocaleDateString('en-US', { month: 'long' });
    return `${weekday}, ${day} ${month}`;
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text style={styles.greeting}>Hi, {name}!</Text>
          <Text style={styles.date}>{dateText}</Text>
        </View>

        <View style={styles.weather}>
          {loadingWeather ? (
            <ActivityIndicator />
          ) : weather ? (
            <>
              <Image
                source={{ uri: getWeatherIconUrl(weather.icon) }}
                style={styles.weatherIcon}
              />
              <View style={styles.weatherText}>
                <Text style={styles.temp}>
                  {weather.temp > 0 ? `+${weather.temp}` : weather.temp}°C
                </Text>
                <Text style={styles.desc}>{weather.description}</Text>
              </View>
            </>
          ) : weatherError ? (
            <Text style={styles.error}>{weatherError}</Text>
          ) : (
            <Text style={styles.error}>Weather unavailable</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.neutralLightLightest,
    borderRadius: SPACING.radius,
    padding: SPACING.lg,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  greeting: {
    ...TYPOGRAPHY.h2,
    fontWeight: '700',
    color: COLORS.neutralDarkDarkest,
  },
  date: {
    ...TYPOGRAPHY.bodyM,
    color: COLORS.neutralDarkDarkest,
    marginTop: 4,
  },
  weather: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherIcon: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  weatherText: {
    alignItems: 'flex-end',
  },
  temp: {
    ...TYPOGRAPHY.bodyM,
    fontWeight: '700',
    color: COLORS.neutralDarkDarkest,
  },
  desc: {
    ...TYPOGRAPHY.bodyM,
    color: COLORS.neutralDarkDarkest,
    marginTop: 2,
  },
  error: {
    ...TYPOGRAPHY.bodyM,
    color: COLORS.neutralDarkDarkest,
  },
});
