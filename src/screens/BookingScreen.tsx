import PrimaryButton from '@/src/components/PrimaryButton';
import ScreenHeader from '@/src/components/ScreenHeader';
import { COURT_TYPES, CourtType, DATES, DURATIONS, TIMES } from '@/src/constants/bookingOptions';
import { COLORS } from '@/src/constants/colors';
import { SCREENS } from '@/src/constants/screens';
import { TYPOGRAPHY } from '@/src/constants/typography';
import React, { useMemo, useState } from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { SPACING } from '../constants/spacing';


export default function BookingScreen({ navigation }: any) {
  const [courtType, setCourtType] = useState<CourtType | null>(null);
  const [date, setDate] = useState<string | null>(null);      
  const [time, setTime] = useState<string | null>(null);     
  const [duration, setDuration] = useState<number | null>(null); 

  const clearAll = () => {
    setCourtType(null);
    setDate(null);
    setTime(null);
    setDuration(null);
  };

  function toggleValue<T>(prev: T | null, next: T): T | null {
  return prev === next ? null : next;
}

  const timeRange = useMemo(() => {
    if (!time || !duration) return null;
    return `${time}–${addMinutes(time, duration)}`; 
  }, [time, duration]);

  const onCheckout = () => {
    if (!courtType || !date || !time || !duration) {
      Alert.alert('Complete booking', 'Please select court type, date, time and duration.');
      return;
    }

    navigation.navigate(SCREENS.YOUR_BOOK, {
      courtType,
      date,
      time: timeRange ?? time,
      duration,
    });
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Booking"
        leftText="Cancel"
        rightText="Clear All"
        onLeftPress={() => navigation.navigate(SCREENS.HOME)}
        onRightPress={clearAll}
      />

      <View style={styles.content}>
        <Text style={styles.label}>Court Type</Text>
        <View style={styles.row}>
          {COURT_TYPES.map((opt) => (
            <Chip
              key={opt.value}
              text={opt.label}
              selected={courtType === opt.value}
              onPress={() => setCourtType((prev) => toggleValue(prev, opt.value))}
            />
  ))}
        </View>

        <Text style={styles.label}>Date</Text>
        <View style={styles.row}>
          {DATES.map((opt) => (
            <Chip
              key={opt.value}
              text={opt.label}
              selected={date === opt.value}
              onPress={() => setDate((prev) => toggleValue(prev, opt.value))}
            />
  ))}
        </View>

        <Text style={styles.label}>Time</Text>
        <View style={styles.row}>
          {TIMES.map((opt) => (
            <Chip
              key={opt.value}
              text={opt.label}
              selected={time === opt.value}
              onPress={() => setTime((prev) => toggleValue(prev, opt.value))}
            />
  ))}
        </View>

        <Text style={styles.label}>Duration</Text>
        <View style={styles.row}>
          {DURATIONS.map((opt) => (
            <Chip
              key={opt.value}
              text={opt.label}
              selected={duration === opt.value}
              onPress={() => setDuration((prev) => toggleValue(prev, opt.value))}
            />
  ))}
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton title="Checkout" onPress={onCheckout} />
      </View>
    </View>
  );
}

function Chip({
  text,
  selected,
  onPress,
}: {
  text: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{text}</Text>
    </Pressable>
  );
}

function addMinutes(hhmm: string, minutes: number) {
  const [h, m] = hhmm.split(':').map(Number);
  const total = h * 60 + m + minutes;
  const hh = Math.floor(total / 60) % 24;
  const mm = total % 60;
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.neutralLightLightest },
  content: { padding: 16, gap: 12 },
  footer: { marginTop: 'auto', padding: 16 },

  label: { ...TYPOGRAPHY.bodyM, color: COLORS.neutralDarkDarkest },
  row: { flexDirection: 'row', gap: 12, flexWrap: 'wrap' },

  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: SPACING.radius,
    borderWidth: 1,
    borderColor: COLORS.primaryGreen,
    backgroundColor: COLORS.lightestGreen,
  },
  chipSelected: {
    borderColor: COLORS.primaryGreen,
    backgroundColor: COLORS.primaryGreen,
  },
  chipText: { ...TYPOGRAPHY.captionM, color: COLORS.primaryGreen },
  chipTextSelected: { color: COLORS.neutralLightLightest},
});
