import { Image,  ImageSourcePropType, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/src/constants/colors';
import { TYPOGRAPHY } from '@/src/constants/typography';

type Props = {
  text?: string;
  source: ImageSourcePropType;
};

export default function HomeBanner({ text, source }: Props) {
  return (
    <View style={styles.banner}>
      <Image source={source} style={styles.bannerImage} resizeMode="cover" />
      <View style={styles.overlay} />
      <Text style={styles.bannerText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    overflow: 'hidden',
    height: 214,
    backgroundColor: COLORS.neutralLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bannerImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  bannerText: {
    ...TYPOGRAPHY.h1,
    fontWeight: '700',
    color: COLORS.neutralLightLightest,
    fontStyle: 'italic',
  },
});
