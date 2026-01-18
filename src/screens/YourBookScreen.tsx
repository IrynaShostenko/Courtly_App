import React, { useMemo, useState } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import ScreenHeader from '@/src/components/ScreenHeader';
import PrimaryButton from '@/src/components/PrimaryButton';
import { COLORS } from '@/src/constants/colors';
import { SCREENS } from '@/src/constants/screens';
import type { RootState } from '@/src/store/store';
import { confirmBooking } from '@/src/store/bookingSlice';

export default function YourBookScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const booking = useSelector((state: RootState) => state.booking);

  const isValid = !!(booking.courtType && booking.date && booking.time && booking.duration);

  const prettyCourt = useMemo(() => {
    if (!booking.courtType) return '';
    return booking.courtType === 'Indoor' ? 'Indoor Court' : 'Outdoor Court';
  }, [booking.courtType]);

  const onBookNow = () => {
    if (!isValid) return;
    dispatch(confirmBooking());
    setOpen(true);
  };

  const onDone = () => {
    setOpen(false);
    // ✅ ПРАВИЛЬНО: йдемо в nested navigator (Tabs -> Home)
    navigation.navigate(SCREENS.TABS, { screen: SCREENS.HOME });
  };

  if (!isValid) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.neutralLightLightest }}>
        <ScreenHeader title="Your Book" leftText="Back" onLeftPress={() => navigation.goBack()} />
        <View style={{ padding: 16 }}>
          <Text style={{ fontSize: 18, marginBottom: 8 }}>Booking data is missing.</Text>
          <Text style={{ opacity: 0.7 }}>Please go back and select date/time/type/duration.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.neutralLightLightest }}>
      <ScreenHeader title="Your Book" leftText="Back" onLeftPress={() => navigation.goBack()} />

      <View style={{ padding: 16, gap: 8 }}>
        <Text>Date: {booking.date}</Text>
        <Text>Time: {booking.time}</Text>
        <Text>Duration: {booking.duration} minutes</Text>
        <Text>Court Type: {prettyCourt}</Text>
      </View>

      <View style={{ marginTop: 'auto', padding: 16 }}>
        <PrimaryButton title="Book Now" onPress={onBookNow} />
      </View>

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <View style={styles.backdrop}>
          <View style={styles.card}>
            <Text style={styles.title}>Thank You!</Text>
            <Text style={styles.subtitle}>Your court booking has been successfully confirmed.</Text>

            <View style={{ marginTop: 16 }}>
              <PrimaryButton title="Done" onPress={onDone} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 18,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    opacity: 0.7,
    lineHeight: 20,
  },
});
