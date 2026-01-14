import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '@/src/navigation/RootStackNavigator';
import { SCREENS } from '@/src/constants/screens';
import { COLORS } from '@/src/constants/colors';
import { SPACING } from '@/src/constants/spacing';

import ScreenHeader from '@/src/components/ScreenHeader';
import TrainerCard from '@/src/components/TrainerCard';

import { fetchTrainers } from '@/src/api/trainers';
import type { Trainer } from '@/src/types/trainer';

type Props = NativeStackScreenProps<RootStackParamList, typeof SCREENS.TRAINERS>;

export default function TrainersScreen({ navigation }: Props) {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainers()
      .then(setTrainers)
      .catch((e) => setError(e instanceof Error ? e.message : 'Unknown error'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.neutralLightLightest }}>
      <ScreenHeader title="Trainers" leftText="Back" onLeftPress={() => navigation.goBack()} />

      {loading ? (
        <View style={{ padding: SPACING.lg }}>
          <ActivityIndicator />
        </View>
      ) : error ? (
        <View style={{ padding: SPACING.lg }}>
          <Text>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={trainers}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: SPACING.lg, gap: SPACING.md }}
          renderItem={({ item }) => (
            <TrainerCard
              name={item.name}
              phone={item.phone}
              photoUrl={item.photoUrl}
              // onPress НЕ треба, якщо деталей тренера не робимо
            />
          )}
        />
      )}
    </View>
  );
}
