// src/components/BookingCalendar.tsx
import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COLORS } from '@/src/constants/colors';
import { SPACING } from '@/src/constants/spacing';
import { TYPOGRAPHY } from '@/src/constants/typography';

type Props = {
  value?: string | null; // 'YYYY-MM-DD'
  onChange: (value: string | null) => void;

  initialYear?: number;
  initialMonth?: number; // 0..11
};

const WEEKDAYS = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU'] as const;

function pad2(n: number) {
  return String(n).padStart(2, '0');
}

function toISODate(y: number, m0: number, d: number) {
  return `${y}-${pad2(m0 + 1)}-${pad2(d)}`;
}

// Пн=0 ... Нд=6
function getMondayIndex(y: number, m0: number, d: number) {
  const js = new Date(y, m0, d).getDay(); // 0=Sun..6=Sat
  return (js + 6) % 7; // 0=Mon..6=Sun
}

function startOfToday() {
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  return t;
}

function isPastDate(today0: Date, y: number, m0: number, d: number) {
  const dt = new Date(y, m0, d);
  dt.setHours(0, 0, 0, 0);
  return dt.getTime() < today0.getTime();
}

function chunkIntoWeeks<T>(arr: T[], size: number) {
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

export default function BookingCalendar({
  value = null,
  onChange,
  initialYear,
  initialMonth,
}: Props) {
  const now = new Date();
  const [year, setYear] = useState<number>(initialYear ?? now.getFullYear());
  const [month, setMonth] = useState<number>(initialMonth ?? now.getMonth()); // 0..11

  const today0 = useMemo(() => startOfToday(), []);

  const monthTitle = useMemo(() => {
    const d = new Date(year, month, 1);
    return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [year, month]);

  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  const startOffset = useMemo(() => {
    return getMondayIndex(year, month, 1);
  }, [year, month]);

  const cells = useMemo(() => {
    const result: (number | null)[] = [];
    for (let i = 0; i < startOffset; i += 1) result.push(null);
    for (let d = 1; d <= daysInMonth; d += 1) result.push(d);
    while (result.length < 42) result.push(null);
    return result;
  }, [startOffset, daysInMonth]);

  const weeks = useMemo(() => chunkIntoWeeks(cells, 7), [cells]);

  const selected = value;

  const goPrev = () => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear((y) => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  const goNext = () => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear((y) => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  const onSelectDay = (d: number) => {
    if (isPastDate(today0, year, month, d)) return;
    const iso = toISODate(year, month, d);
    if (selected === iso) onChange(null);
    else onChange(iso);
  };

  return (
    <View>
      {/* header */}
      <View style={styles.monthNav}>
        <Pressable onPress={goPrev} hitSlop={10} style={styles.navBtn}>
          <Text style={styles.navText}>{'‹'}</Text>
        </Pressable>

        <Text style={styles.monthTitle}>{monthTitle}</Text>

        <Pressable onPress={goNext} hitSlop={10} style={styles.navBtn}>
          <Text style={styles.navText}>{'›'}</Text>
        </Pressable>
      </View>

      {/* weekdays */}
      <View style={styles.weekRow}>
        {WEEKDAYS.map((w) => (
          <Text key={w} style={styles.weekDay}>
            {w}
          </Text>
        ))}
      </View>

      {/* weeks grid (6 rows x 7 cells) */}
      <View style={styles.grid}>
        {weeks.map((week, rowIdx) => (
          <View key={`week-${rowIdx}`} style={styles.weekLine}>
            {week.map((day, colIdx) => {
              if (day == null) {
                return <View key={`e-${rowIdx}-${colIdx}`} style={[styles.cell, styles.cellEmpty]} />;
              }

              const iso = toISODate(year, month, day);
              const disabled = isPastDate(today0, year, month, day);
              const isSelected = selected === iso;

              return (
                <Pressable
                  key={iso}
                  disabled={disabled}
                  onPress={() => onSelectDay(day)}
                  style={[
                    styles.cell,
                    disabled && styles.cellDisabled,
                    isSelected && styles.cellSelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.dayText,
                      disabled && styles.dayTextDisabled,
                      isSelected && styles.dayTextSelected,
                    ]}
                  >
                    {day}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const CELL_SIZE = 36;

const styles = StyleSheet.create({

  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    marginBottom: SPACING.md,
  },
  navBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navText: {
    ...TYPOGRAPHY.h4,
    color: COLORS.neutralDarkDarkest,
  },
  monthTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.neutralDarkDarkest,
  },

  weekRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
  },
  weekDay: {
    width: CELL_SIZE,
    textAlign: 'center',
    ...TYPOGRAPHY.captionM,
    color: COLORS.neutralDarkLight,
  },

  grid: {
    paddingHorizontal: SPACING.lg,
    marginTop: SPACING.sm,
  },
  weekLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  cell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CELL_SIZE / 2,
  },
  cellEmpty: {},

  dayText: {
    ...TYPOGRAPHY.bodyS,
    color: COLORS.neutralDarkDarkest,
  },

  cellDisabled: {
    opacity: 0.35,
  },
  dayTextDisabled: {
    color: COLORS.neutralDarkLight,
  },

  cellSelected: {
    backgroundColor: COLORS.primaryGreen,
  },
  dayTextSelected: {
    color: COLORS.neutralLightLightest,
    fontWeight: '700',
  },
});
