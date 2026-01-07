import { COLORS } from '@/src/constants/colors';
import { SPACING } from '@/src/constants/spacing';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';

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
