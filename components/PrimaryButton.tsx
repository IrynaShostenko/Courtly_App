import { Pressable, Text, StyleSheet, ViewStyle } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { TYPOGRAPHY } from '@/constants/typography';

type Props = {
  title: string;
  onPress?: () => void;
  style?: ViewStyle;
};

export default function PrimaryButton({ title, onPress, style }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.pressed,
        style,
      ]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 48,
    backgroundColor: COLORS.primaryGreen,
    paddingVertical: SPACING.sm,   
    paddingHorizontal: SPACING.md, 
    borderRadius: SPACING.radius,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  pressed: {
    backgroundColor: COLORS.darkGreen,
  },
  text: {
    ...TYPOGRAPHY.actionM,
    color: COLORS.neutralLightLightest,
  },
});
