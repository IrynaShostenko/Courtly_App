import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

import HomeHeader from '@/src/components/HomeHeader';
import HomeBanner from '@/src/components/HomeBanner';
import HomeTrainersSection from '@/src/components/HomeTrainersSection';

import { COLORS } from '@/src/constants/colors';
import { CITIES } from '@/src/constants/cities';

import { useUser } from '@/src/context/UserContext';
import type { RootState } from '@/src/store/store';

function toStartMs(date: string, time: string) {
  return new Date(`${date}T${time}:00`).getTime();
}

function formatPrettyDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  const date = new Date(y, m - 1, d);
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${d} ${months[date.getMonth()]}`;
}

export default function HomeScreen() {
  const { user } = useUser();
  const city = CITIES.ODESA;
  const name = user.firstName || 'Guest';

  const history = useSelector((state: RootState) => state.booking.history);

  const next = (() => {
    const now = Date.now();
    const upcoming = history
      .filter((b) => !b.canceledAt && toStartMs(b.date, b.time) > now)
      .sort((a, c) => toStartMs(a.date, a.time) - toStartMs(c.date, c.time));
    return upcoming[0] ?? null;
  })();

  const bannerText = next
    ? `Your next play: ${formatPrettyDate(next.date)}, ${next.time}`
    : 'Play now!';

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <HomeHeader city={city} name={name} />
        <HomeBanner source={require('@/src/assets/images/banner.jpg')} text={bannerText} />
        <HomeTrainersSection />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: COLORS.neutralLightLightest,
  },
  content: {},
});
