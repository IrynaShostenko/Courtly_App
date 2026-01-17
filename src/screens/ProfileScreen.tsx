import React from 'react';
import { View } from 'react-native';
import ScreenHeader from '@/src/components/ScreenHeader';
import { useUser } from '@/src/context/UserContext';
import FormInput from '@/src/components/FormInput';
import PrimaryButton from '@/src/components/PrimaryButton';

export default function ProfileScreen() {
  const { user, updateUser, resetUser } = useUser();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScreenHeader title="Profile" />

      <View style={{ padding: 16, gap: 12 }}>
        <FormInput
          placeholder="First name"
          value={user.firstName}
          onChangeText={(v) => updateUser({ firstName: v })}
          autoCapitalize="words"
        />

        <FormInput
          placeholder="Last name"
          value={user.lastName}
          onChangeText={(v) => updateUser({ lastName: v })}
          autoCapitalize="words"
        />

        <FormInput
          placeholder="Phone"
          value={user.phone}
          onChangeText={(v) => updateUser({ phone: v })}
          keyboardType="phone-pad"
        />

        <FormInput
          placeholder="Email"
          value={user.email}
          onChangeText={(v) => updateUser({ email: v })}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <PrimaryButton title="Clear profile" onPress={() => void resetUser()} />
      </View>
    </View>
  );
}
