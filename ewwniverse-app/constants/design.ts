/** EWW-niverse design tokens — mirrors tailwind.config.js */
export const Colors = {
  bg: {
    DEFAULT: '#080808',
    surface: '#111111',
    card: '#161616',
    elevated: '#1C1C1C',
  },
  eww: {
    green: '#5DB84A',
    greenLight: '#6ED44F',
    greenDark: '#3D8C2A',
    amber: '#D48B1A',
    coral: '#E86C5D',
    purple: '#A78BFA',
    gold: '#F0C040',
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255,255,255,0.65)',
    muted: 'rgba(255,255,255,0.35)',
    disabled: 'rgba(255,255,255,0.20)',
  },
  border: {
    DEFAULT: 'rgba(93,184,74,0.15)',
    subtle: 'rgba(255,255,255,0.08)',
    strong: 'rgba(93,184,74,0.35)',
  },
  ewwMeter: {
    low: '#60D477',    // 60
    mid: '#F0A030',    // 80
    high: '#E83030',   // 100
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
