import React from 'react';
import { View, Text } from 'react-native';
import ScreenHeader from '@/src/components/ScreenHeader';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScreenHeader title="Profile" />
      <View style={{ padding: 16 }}>
        <Text>Profile content</Text>
      </View>
    </View>
  );
}
