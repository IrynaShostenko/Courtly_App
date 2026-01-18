import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import PrimaryButton from '@/src/components/PrimaryButton';
import ScreenHeader from '@/src/components/ScreenHeader';
import BookingCalendar from '@/src/components/BookingCalendar';

import {
  COURT_TYPES,
  DURATIONS,
  TIMES,
  type CourtType,
  type DurationMin,
} from '@/src/constants/bookingOptions';

import { COLORS } from '@/src/constants/colors';
import { SCREENS } from '@/src/constants/screens';
import { SPACING } from '@/src/constants/spacing';
import { TYPOGRAPHY } from '@/src/constants/typography';

import type { RootState } from '@/src/store/store';
import { clearAll, setCourtType, setDate, setDuration, setTime } from '@/src/store/bookingSlice';

export default function BookingScreen({ navigation }: any) {
  const dispatch = useDispatch();

  const { courtType, date, time, duration } = useSelector((state: RootState) => state.booking);

  function toggleValue<T>(prev: T | null, next: T): T | null {
    return prev === next ? null : next;
  }

  const onCheckout = () => {
    if (!courtType || !date || !time || !duration) {
      Alert.alert('Complete booking', 'Please select court type, date, time and duration.');
      return;
    }
    navigation.navigate(SCREENS.YOUR_BOOK);
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Booking"
        leftText="Cancel"
        rightText="Clear All"
        onLeftPress={() => navigation.goBack()}
        onRightPress={() => dispatch(clearAll())}
      />

      <View style={styles.content}>
        <Text style={styles.label}>Court Type</Text>
        <View style={styles.row}>
          {COURT_TYPES.map((opt) => (
            <Chip
              key={opt.value}
              text={opt.label}
              selected={courtType === opt.value}
              onPress={() => dispatch(setCourtType(toggleValue<CourtType>(courtType, opt.value)))}
            />
          ))}
        </View>

        <Text style={styles.label}>Date</Text>
        <BookingCalendar value={date} onChange={(next) => dispatch(setDate(next))} />

        <Text style={styles.label}>Time</Text>
        <View style={styles.row}>
          {TIMES.map((opt) => (
            <Chip
              key={opt.value}
              text={opt.label}
              selected={time === opt.value}
              onPress={() => dispatch(setTime(toggleValue(time, opt.value)))}
            />
          ))}
        </View>

        <Text style={styles.label}>Duration</Text>
        <View style={styles.row}>
          {DURATIONS.map((opt) => (
            <Chip
              key={String(opt.value)}
              text={opt.label}
              selected={duration === opt.value}
              onPress={() =>
                dispatch(setDuration(toggleValue<DurationMin>(duration, opt.value as DurationMin)))
              }
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

function Chip({ text, selected, onPress }: { text: string; selected: boolean; onPress: () => void }) {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.chipText, selected && styles.chipTextSelected]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.neutralLightLightest },
  content: { padding: 24, gap: 12 },
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
  chipSelected: { borderColor: COLORS.primaryGreen, backgroundColor: COLORS.primaryGreen },
  chipText: { ...TYPOGRAPHY.captionM, color: COLORS.primaryGreen },
  chipTextSelected: { color: COLORS.neutralLightLightest },
});
