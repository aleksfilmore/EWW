import '../global.css';
import { useEffect, useState } from 'react';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { Boogaloo_400Regular } from '@expo-google-fonts/boogaloo';
import { Creepster_400Regular } from '@expo-google-fonts/creepster';
import { Colors } from '@/constants/design';
import { useUserStore } from '@/store/userStore';
import { signInAnonymously, onAuthStateChanged } from '@/services/firebase';
import { ONBOARDING_KEY } from '@/constants/storage';
import { ErrorBoundary } from '@/components/ErrorBoundary';

// Keep splash visible until we're ready
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 1,
    },
  },
});

function AppBootstrap() {
  const { isHydrated, initUser } = useUserStore();
  const [fontsLoaded] = useFonts({ Boogaloo_400Regular, Creepster_400Regular });
  const [onboardingChecked, setOnboardingChecked] = useState(false);
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Check onboarding preference from persistent storage
  useEffect(() => {
    AsyncStorage.getItem(ONBOARDING_KEY).then((val) => {
      setShowOnboarding(val !== '1');
      setOnboardingChecked(true);
    });
  }, []);

  useEffect(() => {
    // Anonymous Firebase auth — creates a persistent UID on first launch
    const unsubscribe = onAuthStateChanged((user) => {
      if (user) {
        initUser(user.uid);
      } else {
        signInAnonymously().catch(() => {
          initUser('local-anon-dev');
        });
      }
    });
    return unsubscribe;
  }, [initUser]);

  useEffect(() => {
    if (isHydrated && fontsLoaded && onboardingChecked) {
      SplashScreen.hideAsync();
      if (showOnboarding) {
        router.replace('/onboarding');
      }
    }
  }, [isHydrated, fontsLoaded, onboardingChecked, showOnboarding]);

  return null;
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <ErrorBoundary>
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
        </ErrorBoundary>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}
