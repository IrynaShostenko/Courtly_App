import { Animated, ImageSourcePropType, StyleSheet, Text, View, Platform } from 'react-native';
import React, { useRef } from 'react';
import { COLORS } from '@/src/constants/colors';
import { TYPOGRAPHY } from '@/src/constants/typography';
import { useFocusEffect } from '@react-navigation/native';



type Props = {
  text?: string;
  source: ImageSourcePropType;
};

export default function HomeBanner({ text, source }: Props) {
    const anim = useRef(new Animated.Value(0)).current;

  useFocusEffect(
  React.useCallback(() => {
    anim.setValue(0);

    Animated.timing(anim, {
      toValue: 1,
      duration: 650,
      useNativeDriver: Platform.OS !== 'web',
    }).start();

    return () => {};
  }, [anim])
);

  const opacity = anim;
  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [1.07, 1], 
  });
 return (
    <View style={styles.banner}>
      <Animated.Image
        source={source}
        style={[styles.bannerImage, { opacity, transform: [{ scale }] }]}
        resizeMode="cover"
      />
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
    width: '80%',
  },
});




  