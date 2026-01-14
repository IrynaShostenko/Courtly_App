import { StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HomeHeader from '@/src/components/HomeHeader';
import HomeBanner from '@/src/components/HomeBanner';
import HomeTrainersSection from '@/src/components/HomeTrainersSection';

import { COLORS } from '@/src/constants/colors';
import { CITIES } from '@/src/constants/cities';

export default function HomeScreen() {
  const city = CITIES.ODESA;
  const name = "Iryna";
  const bannertext = "Play now!";

  return (
    <SafeAreaView style={styles.safe} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <HomeHeader city={city} name={name} />
        <HomeBanner
          source={require('@/src/assets/images/banner.jpg')}
          text={bannertext}
        />
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
