import { View, TextInput, StyleSheet, ViewStyle, TextInputProps } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { TYPOGRAPHY } from '@/constants/typography';

type Props = TextInputProps & {
  containerStyle?: ViewStyle;
};

export default function FormInput({ containerStyle, style, ...props }: Props) {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        {...props}
        style={[styles.input, style]}
        placeholderTextColor={COLORS.neutralDarkLight}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.neutralLightDark,
    borderRadius: SPACING.radius, 
    paddingHorizontal: SPACING.md,
    height: 48,
    justifyContent: 'center',
  },
  input: {
    ...TYPOGRAPHY.bodyM,
    color: COLORS.neutralDarkDarkest,
  },
});
