import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, Text, View, LayoutAnimation, Platform, UIManager } from 'react-native';
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

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function HomeTrainersSection() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const onSeeMore = useCallback(() => {
  navigation.navigate(SCREENS.TRAINERS);
}, [navigation]);


useEffect(() => {
  fetchTrainers()
    .then((data) => {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      setTrainers(data);
    })
    .catch((e) => setError(e instanceof Error ? e.message : 'Unknown error'))
    .finally(() => setLoading(false));
}, []);


  const preview = useMemo(() => trainers.slice(0, 5), [trainers]);


  return (
    <View style={{ paddingHorizontal: SPACING.lg, marginTop: SPACING.lg }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ ...TYPOGRAPHY.h4, color: COLORS.neutralDarkDarkest }}>Our Trainers</Text>

        <Pressable onPress={onSeeMore} hitSlop={10}>
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
          keyExtractor={(item) => item.id || item.phone || item.photoUrl}
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
