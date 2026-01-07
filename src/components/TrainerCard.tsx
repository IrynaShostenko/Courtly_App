import { COLORS } from '@/src/constants/colors';
import { SPACING } from '@/src/constants/spacing';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { Image, ImageSourcePropType, StyleSheet, Text, View, ViewStyle } from 'react-native';

type Props = {
  name: string;
  image: ImageSourcePropType;
  style?: ViewStyle;
};

export default function TrainerCard({ name, image, style }: Props) {
  return (
  <View style={[styles.card, style]}>
    <Image source={image} style={styles.image} resizeMode="cover" />
    <View style={styles.nameBox}>
      <Text style={styles.name}>{name}</Text>
    </View>
  </View>
);
}

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 168,
    backgroundColor: COLORS.lightGreen,
    borderRadius: SPACING.radius,
    overflow: 'hidden',
    marginRight: SPACING.md, // 16
  },
  image: {
    width: '100%',
    height: 120, // верхня частина з фото
  },
  nameBox: {
    flex: 1,
    paddingHorizontal: SPACING.md, 
    justifyContent: 'center',
  },
  name: {
    ...TYPOGRAPHY.bodyS,
    color: COLORS.neutralDarkDarkest,
  },
});

