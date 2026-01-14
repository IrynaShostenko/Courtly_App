// src/constants/typography.ts
const FONT_FAMILY = 'Inter';

export const TYPOGRAPHY = {
  h1: {
    fontFamily: FONT_FAMILY,
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 32,
    letterSpacing: 0.24,
  },
  h2: {
    fontFamily: FONT_FAMILY,
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 28,
    letterSpacing: 0.2,
  },
  h4: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodyS: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0.12,
  },
  bodyM: {
    fontFamily: FONT_FAMILY,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    letterSpacing: 0,
  },
  bodyXS: {
    fontFamily: FONT_FAMILY,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 14,
    letterSpacing: 0.15,
  },
  actionM: {
    fontFamily: FONT_FAMILY,
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0,
  },
  captionM: {
  fontFamily: FONT_FAMILY,
  fontSize: 10,
  fontWeight: '600', 
  lineHeight: 14,    
  letterSpacing: 0.5, 
}

} as const;
