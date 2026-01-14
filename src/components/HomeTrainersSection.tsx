import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { fetchTrainers } from '@/src/api/trainers';
import type { Trainer } from '@/src/types/trainer';

import TrainerCard from '@/src/components/TrainerCard';
import { SPACING } from '@/src/constants/spacing';
import { COLORS } from '@/src/constants/colors';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { SCREENS } from '@/src/constants/screens';
import type { RootStackParamList } from '@/src/navigation/RootStackNavigator';

export default function HomeTrainersSection() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchTrainers()
      .then(setTrainers)
      .catch((e) => setError(e instanceof Error ? e.message : 'Unknown error'))
      .finally(() => setLoading(false));
  }, []);

  const preview = trainers.slice(0, 5);

  return (
    <View style={{ paddingHorizontal: SPACING.lg, marginTop: SPACING.lg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ ...TYPOGRAPHY.h4, color: COLORS.neutralDarkDarkest }}>Our Trainers</Text>

        <Pressable onPress={() => navigation.navigate(SCREENS.TRAINERS)} hitSlop={10}>
          <Text style={{ ...TYPOGRAPHY.bodyM, color: COLORS.primaryGreen }}>See more</Text>
        </Pressable>
      </View>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 12 }} />
      ) : error ? (
        <Text style={{ marginTop: 12 }}>{error}</Text>
      ) : (
        <FlatList
          data={preview}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: SPACING.md, paddingBottom: SPACING.md }}
          renderItem={({ item }) => (
            <TrainerCard
              name={item.name}
              photoUrl={item.photoUrl}
            />
          )}
        />
      )}
    </View>
  );
}
