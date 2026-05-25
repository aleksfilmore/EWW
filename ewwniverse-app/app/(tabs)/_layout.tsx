import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';
import { Colors, FontFamily } from '@/constants/design';

const TAB_IMAGES = {
  index:          require('../../assets/tab-home.png'),
  collection:     require('../../assets/tab-explore.png'),
  'recruit-file': require('../../assets/tab-rewards.png'),
  'dr-icky':      require('../../assets/tab-special.png'),
} as const;

function TabIcon({ name, focused }: { name: keyof typeof TAB_IMAGES; focused: boolean }) {
  return (
    <Image
      source={TAB_IMAGES[name]}
      style={[
        styles.icon,
        { tintColor: focused ? Colors.eww.green : 'rgba(255,255,255,0.38)' },
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
      <Tabs.Screen
        name="dr-icky"
        options={{
          title: 'DR. ICKY',
          tabBarIcon: ({ focused }) => (
            <TabIcon name="dr-icky" focused={focused} />
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
    width: 26,
    height: 26,
    marginBottom: -2,
  },
  label: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 10,
    letterSpacing: 1.2,
  },
});
