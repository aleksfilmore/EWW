import '../global.css';
import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import { Colors } from '@/constants/design';
import { useUserStore } from '@/store/userStore';
import { signInAnonymously, onAuthStateChanged } from '@/services/firebase';

// Keep splash visible until we're ready
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      retry: 1,
    },
  },
});

function AppBootstrap() {
  const { isHydrated, initUser } = useUserStore();

  useEffect(() => {
    // Anonymous Firebase auth — creates a persistent UID on first launch
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        initUser(user.uid);
      } else {
        // No user yet — sign in anonymously
        signInAnonymously().catch(() => {
          // Fallback for offline / no-config state (dev only)
          initUser('local-anon-dev');
        });
      }
    });
    return unsubscribe;
  }, [initUser]);

  useEffect(() => {
    if (isHydrated) {
      SplashScreen.hideAsync();
    }
  }, [isHydrated]);

  return null;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <AppBootstrap />
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.bg.DEFAULT },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="creature/[id]" options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name="quiz/index" options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name="paywall" options={{ animation: 'slide_from_bottom' }} />
          <Stack.Screen name="onboarding" options={{ animation: 'fade' }} />
        </Stack>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
