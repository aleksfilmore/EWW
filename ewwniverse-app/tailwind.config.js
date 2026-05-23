/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // EWW brand palette
        bg: {
          DEFAULT: '#080808',
          surface: '#111111',
          card: '#161616',
          elevated: '#1C1C1C',
        },
        eww: {
          green: '#5DB84A',
          'green-light': '#6ED44F',
          'green-dark': '#3D8C2A',
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
        ewwmeter: {
          low: '#60D477',    // 60% — greenish
          mid: '#F0A030',    // 80% — amber
          high: '#E83030',   // 100% — red/danger
        },
      },
      fontFamily: {
        creepster: ['Creepster_400Regular'],
        boogaloo: ['Boogaloo_400Regular'],
        body: ['System'],
      },
    },
  },
  plugins: [],
};
