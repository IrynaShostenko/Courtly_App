import React from 'react';
import { View, Text } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/src/navigation/RootStackNavigator';
import { SCREENS } from '@/src/constants/screens';
import ScreenHeader from '@/src/components/ScreenHeader';

type Props = NativeStackScreenProps<RootStackParamList, typeof SCREENS.YOUR_BOOK>;

export default function YourBookScreen({ navigation, route }: Props) {
  const { date, time, duration, courtType } = route.params ?? ({} as any);

  if (!date || !time) return <Text>Missing booking data</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: 'neutralLightLightest' }}>
      <ScreenHeader title="Your Book" leftText="Back" onLeftPress={() => navigation.goBack()} />
      <View style={{ padding: 16, gap: 8 }}>
        <Text>Date: {date}</Text>
        <Text>Time: {time}</Text>
        <Text>Duration: {duration}</Text>
        <Text>Court Type: {courtType}</Text>
      </View>
    </View>
  );
}
