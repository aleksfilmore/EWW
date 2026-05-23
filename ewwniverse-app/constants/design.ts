/** EWW-niverse design tokens — mirrors tailwind.config.js + website globals.css */
export const Colors = {
  bg: {
    DEFAULT: '#0D0820',     // dark purple-black — the lab
    surface: '#140E28',
    card: '#1A1232',
    elevated: '#1F1640',
    parchment: '#F4EED8',       // aged paper — website: --color-parchment
    parchmentDark: '#EDE5CE',   // website: --color-parchment-dark
    parchmentLight: '#FDFAF3',  // website: --color-parchment-light
  },
  eww: {
    green: '#5DB84A',      // website: --color-slime
    greenLight: '#6ED44F', // website: --color-slime-light
    greenDark: '#3D8C2A',  // website: --color-slime-dark
    amber: '#D48B1A',      // website: --color-amber
    coral: '#E86C5D',
    purple: '#6B3FD4',     // website: --color-purple (updated to exact match)
    purpleDark: '#4E2EA8', // website: --color-purple-dark
    purpleLight: '#EDE8FB',
    gold: '#F0C040',
    forest: '#1A3D0E',     // website: --color-forest — dark green text on parchment
    bark: '#3D2B1F',       // website: --color-bark — brown text on parchment
    barkLight: '#7A6652',  // website: --color-bark-light
    tan: '#C8B89A',        // website: --color-tan — parchment border
  },
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255,255,255,0.65)',
    muted: 'rgba(255,255,255,0.35)',
    disabled: 'rgba(255,255,255,0.20)',
    // on parchment cards
    onParchment: '#1A3D0E',      // forest green — same as website h1-h5
    onParchmentSub: '#3D2B1F',   // bark brown — same as website body
    onParchmentMuted: '#7A6652', // bark light — same as website secondary
  },
  border: {
    DEFAULT: 'rgba(93,184,74,0.18)',
    subtle: 'rgba(255,255,255,0.08)',
    strong: 'rgba(93,184,74,0.40)',
    parchment: '#C8B89A',  // tan — parchment card border
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
