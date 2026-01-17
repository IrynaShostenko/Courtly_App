import React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/src/store/store';
import ScreenHeader from '@/src/components/ScreenHeader';
import { COLORS } from '@/src/constants/colors';

export default function YourBookScreen({ navigation }: any) {
  const { date, time, duration, courtType } = useSelector(
    (state: RootState) => state.booking
  );

  if (!date || !time) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.neutralLightLightest }}>
        <ScreenHeader title="Your Book" leftText="Back" onLeftPress={() => navigation.goBack()} />
        <View style={{ padding: 16 }}>
          <Text>Booking data is missing. Please go back and select date/time.</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.neutralLightLightest }}>
      <ScreenHeader title="Your Book" leftText="Back" onLeftPress={() => navigation.goBack()} />
      <View style={{ padding: 16, gap: 8 }}>
        <Text>Date: {date}</Text>
        <Text>Time: {time}</Text>
        <Text>Duration: {duration} minutes</Text>
        <Text>Court Type: {courtType}</Text>
      </View>
    </View>
  );
}
