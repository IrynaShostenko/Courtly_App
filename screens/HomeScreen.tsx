import FormInput from '@/components/FormInput';
import PrimaryButton from '@/components/PrimaryButton';
import ScreenHeader from '@/components/ScreenHeader';
import SectionHeader from '@/components/SectionHeader';
import TrainerCard from '@/components/TrainerCard';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';

export default function HomeScreen() {
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={{ height: 48 }} />
      <ScreenHeader
        title="Booking"
        leftText="Cancel"
        rightText="Clear All"
      />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, padding: 16 }}
        keyboardShouldPersistTaps="handled"
      >
        <SectionHeader title="Our Trainers" rightText="See more" />
        <TrainerCard
          name="Adam"
          image={require('../assets/images/adam.jpg')}
        />
        <View style={{ flex: 1 }} />
        <FormInput placeholder="Email address" />
        <View style={{ height: 16 }} />
        <PrimaryButton title="TEST" />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
