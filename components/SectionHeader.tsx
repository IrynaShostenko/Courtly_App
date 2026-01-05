import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { TYPOGRAPHY } from '@/constants/typography';

type Props = {
  title: string;
  leftText?: string;
  rightText?: string;
};

export default function SectionHeader({ title, leftText, rightText }: Props) {
  const hasSides = !!leftText || !!rightText;

  return (
    <View style={styles.row}>
      {hasSides && <Text style={styles.side}>{leftText ?? ''}</Text>}

      <Text
        style={[
          styles.title,
          !hasSides && styles.titleLeft, // ← ключовий момент
        ]}
      >
        {title}
      </Text>

      {hasSides && <Text style={styles.side}>{rightText ?? ''}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  side: {
    ...TYPOGRAPHY.bodyM,
    color: COLORS.primaryGreen,
    width: 80,
  },
  title: {
    ...TYPOGRAPHY.h4,
    color: COLORS.neutralDarkDarkest,
    flex: 1,
    textAlign: 'center',
  },
  titleLeft: {
    textAlign: 'left',
  },
});
