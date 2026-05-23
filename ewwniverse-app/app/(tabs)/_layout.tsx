import { Tabs } from 'expo-router';
import { Text, StyleSheet } from 'react-native';
import { Colors, FontFamily } from '@/constants/design';

// SVG-style tab icons using Unicode characters that render well on Android
const TAB_ICONS: Record<string, { active: string; inactive: string }> = {
  index:          { active: '🏠', inactive: '🏠' },
  collection:     { active: '🔬', inactive: '🔬' },
  'recruit-file': { active: '🏆', inactive: '🏆' },
};

function TabIcon({ name, focused }: { name: string; focused: boolean }) {
  const icon = TAB_ICONS[name] ?? { active: '●', inactive: '○' };
  return (
    <Text style={[styles.icon, { opacity: focused ? 1 : 0.4 }]}>
      {focused ? icon.active : icon.inactive}
    </Text>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.bar,
        tabBarActiveTintColor: Colors.eww.green,
        tabBarInactiveTintColor: 'rgba(255,255,255,0.38)',
        tabBarLabelStyle: styles.label,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'HOME',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="index" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: 'EXPLORE',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="collection" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="recruit-file"
        options={{
          title: 'REWARDS',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="recruit-file" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  bar: {
    backgroundColor: '#0A0618',  // slightly darker than bg for contrast
    borderTopColor: `${Colors.eww.green}25`,
    borderTopWidth: 1.5,
    height: 64,
    paddingBottom: 10,
    paddingTop: 4,
  },
  icon: {
    fontSize: 20,
    marginBottom: -2,
  },
  label: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 10,
    letterSpacing: 1.2,
  },
});
