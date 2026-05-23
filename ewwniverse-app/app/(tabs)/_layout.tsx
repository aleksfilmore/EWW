import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { Colors } from '@/constants/design';

// Simple tab icon placeholder — will use custom SVG icons later
function TabIcon({
  focused,
  emoji,
}: {
  focused: boolean;
  emoji: string;
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        opacity: focused ? 1 : 0.45,
      }}
    >
      {/* Using text emoji temporarily; swap for custom SVG icons */}
      <View
        style={{
          backgroundColor: focused ? `${Colors.eww.green}22` : 'transparent',
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 4,
        }}
      />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.bg.surface,
          borderTopColor: Colors.border.DEFAULT,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
        },
        tabBarActiveTintColor: Colors.eww.green,
        tabBarInactiveTintColor: Colors.text.disabled,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '500',
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Lab HQ',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} emoji="🧪" />
          ),
        }}
      />
      <Tabs.Screen
        name="collection"
        options={{
          title: 'Collection',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} emoji="🔬" />
          ),
        }}
      />
      <Tabs.Screen
        name="recruit-file"
        options={{
          title: 'Recruit File',
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} emoji="📋" />
          ),
        }}
      />
    </Tabs>
  );
}
