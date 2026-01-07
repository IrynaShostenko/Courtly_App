import React from 'react';
import { View } from 'react-native';
import ScreenHeader from '@/src/components/ScreenHeader';
import SectionHeader from '@/src/components/SectionHeader';
import TrainerCard from '@/src/components/TrainerCard';

export default function HomeScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: 'neutralLightLightest' }}>
      <ScreenHeader title="Home" />

      <View style={{ padding: 16 }}>
        <SectionHeader title="Our Trainers" />
        <TrainerCard
          name="Adam"
          image={require('@/src/assets/trainers/adam.jpg')}
        />
      </View>
    </View>
  );
}
