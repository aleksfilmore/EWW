import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';
import { Colors, FontFamily } from '@/constants/design';
import { IS_TABLET, fs } from '@/constants/responsive';
import { playSfx } from '@/services/audio';

const TAB_IMAGES = {
  index:          require('../../assets/tab-home.png'),
  collection:     require('../../assets/tab-explore.png'),
  'recruit-file': require('../../assets/tab-rewards.png'),
  'dr-icky':      require('../../assets/tab-special.png'),
} as const;

// Active color per tab — each tab gets its own identity
const TAB_COLORS: Record<keyof typeof TAB_IMAGES, string> = {
  index:          Colors.eww.green,
  collection:     Colors.eww.amber,
  'recruit-file': Colors.eww.purple,
  'dr-icky':      Colors.eww.coral,
};

function TabIcon({ name, focused }: { name: keyof typeof TAB_IMAGES; focused: boolean }) {
  return (
    <Image
      source={TAB_IMAGES[name]}
      style={[
        styles.icon,
        { tintColor: focused ? TAB_COLORS[name] : 'rgba(255,255,255,0.32)' },
      ]}
      resizeMode="contain"
    />
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.bar,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.32)',
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarActiveTintColor: TAB_COLORS.index,
          tabBarIcon: ({ focused }) => <TabIcon name="index" focused={focused} />,
        }}
        listeners={{ tabPress: () => playSfx('sfx_tab') }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: 'EXPLORE',
          tabBarActiveTintColor: TAB_COLORS.collection,
          tabBarIcon: ({ focused }) => <TabIcon name="collection" focused={focused} />,
        }}
        listeners={{ tabPress: () => playSfx('sfx_tab') }}
      />
      <Tabs.Screen
        name="recruit-file"
        options={{
          title: 'REWARDS',
          tabBarActiveTintColor: TAB_COLORS['recruit-file'],
          tabBarIcon: ({ focused }) => <TabIcon name="recruit-file" focused={focused} />,
        }}
        listeners={{ tabPress: () => playSfx('sfx_tab') }}
      />
      <Tabs.Screen
        name="dr-icky"
        options={{
          title: 'DR. ICKY',
          tabBarActiveTintColor: TAB_COLORS['dr-icky'],
          tabBarIcon: ({ focused }) => <TabIcon name="dr-icky" focused={focused} />,
        }}
        listeners={{ tabPress: () => playSfx('sfx_tab') }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#0A0618',
    borderTopColor:  `${Colors.eww.green}22`,
    borderTopWidth:  1.5,
    height:          IS_TABLET ? 88 : 74,
    paddingBottom:   14,
    paddingTop:      6,
  },
  icon: {
    width:        fs(28),
    height:       fs(28),
    marginBottom: -2,
  },
  label: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      fs(10),
    letterSpacing: 1.2,
  },
});
