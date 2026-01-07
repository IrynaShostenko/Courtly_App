import React from 'react';
import { View } from 'react-native';
import { SCREENS } from '@/src/constants/screens';
import ScreenHeader from '@/src/components/ScreenHeader';
import PrimaryButton from '@/src/components/PrimaryButton';

export default function BookingScreen({ navigation }: any) {
  return (
    <View style={{ flex: 1, backgroundColor: 'neutralLightLightest' }}>
      <ScreenHeader
        title="Booking"
        leftText="Cancel"
        rightText="Clear All"
        onLeftPress={() => navigation.navigate(SCREENS.HOME)}
        onRightPress={() => {
            // Clear all action
        }}
      />

      <View style={{ marginTop: 'auto', padding: 16 }}>
        <PrimaryButton
          title="Checkout"
          onPress={() =>
            navigation.navigate(SCREENS.YOUR_BOOK, {
              date: '2025-11-25',
              time: '15:00-16:30',
              duration: '90',
              courtType: 'Outdoor',
            })
          }
        />
      </View>
    </View>
  );
}
