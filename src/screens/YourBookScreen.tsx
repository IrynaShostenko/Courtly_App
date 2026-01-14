import React from 'react';
import { Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/navigation/RootStackNavigator';
import { SCREENS } from '@/src/constants/screens';
import ScreenHeader from '@/src/components/ScreenHeader';
import { COLORS } from '@/src/constants/colors';

type Props = NativeStackScreenProps<RootStackParamList, typeof SCREENS.YOUR_BOOK>;

export default function YourBookScreen({ navigation, route }: Props) {
  const params = route.params;

  if (!params?.date || !params?.time) {
    return (
      <View style={{ flex: 1, backgroundColor: COLORS.neutralLightLightest }}>
        <ScreenHeader title="Your Book" leftText="Back" onLeftPress={() => navigation.goBack()} />
        <View style={{ padding: 16 }}>
          <Text>Booking data is missing. Please go back and select date/time.</Text>
        </View>
      </View>
    );
  }

  const { date, time, duration, courtType } = params;

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
