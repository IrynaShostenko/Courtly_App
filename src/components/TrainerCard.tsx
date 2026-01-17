import { COLORS } from '@/src/constants/colors';
import { SPACING } from '@/src/constants/spacing';
import { TYPOGRAPHY } from '@/src/constants/typography';
import React, { memo } from 'react';
import { Image, Pressable, StyleSheet, Text, View, ViewStyle } from 'react-native';

type Props = {
  name: string;
  photoUrl: string;
  phone?: string;
  style?: ViewStyle;
  onPress?: () => void;
};

function TrainerCard({ name, phone, photoUrl, style, onPress }: Props) {
  return (
    <Pressable onPress={onPress} disabled={!onPress}>
      <View style={[styles.card, style]}>
        <Image source={{ uri: photoUrl }} style={styles.image} resizeMode="cover" />
        <View style={styles.nameBox}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.phone}>{phone}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default memo(TrainerCard);

const styles = StyleSheet.create({
  card: {
    width: 200,
    height: 168,
    backgroundColor: COLORS.lightGreen,
    borderRadius: SPACING.radius,
    overflow: 'hidden',
    marginRight: SPACING.md,
  },
  image: {
    width: '100%',
    height: 120,
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
   phone: {
    ...TYPOGRAPHY.bodyS,
    color: COLORS.neutralDarkLight,
    marginTop: 2,
  },
});

