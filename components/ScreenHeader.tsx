import { View, Text, Pressable, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/colors';
import { SPACING } from '@/constants/spacing';
import { TYPOGRAPHY } from '@/constants/typography';

type Props = {
  title: string;

  // left
  leftText?: string;          
  leftIcon?: React.ReactNode; 
  onLeftPress?: () => void;

  // right
  rightText?: string;        
  onRightPress?: () => void;
};

export default function ScreenHeader({
  title,
  leftText,
  leftIcon,
  onLeftPress,
  rightText,
  onRightPress,
}: Props) {
  return (
    <View style={styles.container}>
      {/* Left */}
      <View style={styles.side}>
        {(leftText || leftIcon) ? (
          <Pressable onPress={onLeftPress} hitSlop={8}>
            {leftIcon ? leftIcon : <Text style={styles.action}>{leftText}</Text>}
          </Pressable>
        ) : null}
      </View>

      {/* Center */}
      <Text style={styles.title}>{title}</Text>

      {/* Right */}
      <View style={[styles.side, styles.sideRight]}>
        {rightText ? (
          <Pressable onPress={onRightPress} hitSlop={8}>
            <Text style={styles.action}>{rightText}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

const SIDE_WIDTH = 90;

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
  },
  side: {
    width: SIDE_WIDTH, 
    justifyContent: 'center',
  },
  sideRight: {
    alignItems: 'flex-end',
  },
  title: {
    ...TYPOGRAPHY.h4,
    flex: 1,
    textAlign: 'center',
    color: COLORS.neutralDarkDarkest,
  },
  action: {
    ...TYPOGRAPHY.actionM,
    color: COLORS.primaryGreen,
  },
});
