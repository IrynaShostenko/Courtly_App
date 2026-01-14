import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsNavigator from '@/src/navigation/TabsNavigator';
import YourBookScreen from '@/src/screens/YourBookScreen';
import { SCREENS } from '@/src/constants/screens';

export type RootStackParamList = {
  [SCREENS.TABS]: undefined;
  [SCREENS.YOUR_BOOK]: {
    date: string;
    time: string;
    duration: number;
    courtType: 'Indoor' | 'Outdoor';
  };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREENS.TABS} component={TabsNavigator} />
      <Stack.Screen name={SCREENS.YOUR_BOOK} component={YourBookScreen} />
    </Stack.Navigator>
  );
}
