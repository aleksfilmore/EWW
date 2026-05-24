/** EWW-niverse design tokens — updated to match dark-purple illustrated mockup */
export const Colors = {
  bg: {
    DEFAULT: '#12082A',     // deep purple-black — the lab
    surface: '#1A0D35',
    card: '#1E1040',
    elevated: '#251550',
    parchment: '#F4EED8',       // aged paper (onboarding / parchment cards only)
    parchmentDark: '#EDE5CE',
    parchmentLight: '#FDFAF3',
  },
  eww: {
    green: '#7AE838',      // bright lime — primary action / slime
    greenLight: '#9AFF50',
    greenDark: '#4A9F20',
    amber: '#FF8C00',      // streak / warnings
    amberDark: '#C86800',
    coral: '#E86C5D',
    purple: '#8B3FFF',     // primary purple — borders, highlights
    purpleDark: '#6B2FBF',
    purpleLight: '#EDE8FB',
    purpleMid: '#5B1FBF',
    gold: '#F0C040',
    forest: '#1A3D0E',
    bark: '#3D2B1F',
    barkLight: '#7A6652',
    tan: '#C8B89A',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255,255,255,0.70)',
    muted: 'rgba(255,255,255,0.40)',
    disabled: 'rgba(255,255,255,0.20)',
    lime: '#7AE838',       // green text on dark bg
    purple: '#B87AFF',     // purple text on dark bg
    amber: '#FF8C00',
    // on parchment cards (onboarding only)
    onParchment: '#1A3D0E',
    onParchmentSub: '#3D2B1F',
    onParchmentMuted: '#7A6652',
  },
  border: {
    DEFAULT: 'rgba(139,63,255,0.30)',   // purple glow
    subtle: 'rgba(139,63,255,0.15)',
    strong: 'rgba(139,63,255,0.60)',
    green: 'rgba(122,232,56,0.40)',
    greenStrong: 'rgba(122,232,56,0.70)',
    parchment: '#C8B89A',
  },
  ewwMeter: {
    low: '#7AE838',   // 60 — green
    mid: '#FF8C00',   // 80 — amber
    high: '#E83030',  // 100 — red
  },
} as const;

export const ewwMeterColor = (value: 60 | 80 | 100) => {
  if (value === 60) return Colors.ewwMeter.low;
  if (value === 80) return Colors.ewwMeter.mid;
  return Colors.ewwMeter.high;
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const Radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
} as const;

export const FontFamily = {
  creepster: 'Creepster_400Regular',
  boogaloo: 'Boogaloo_400Regular',
} as const;
