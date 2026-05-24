/**
 * Onboarding — 3-slide intro carousel shown on every launch.
 * User can opt out with "Don't show this again".
 *
 * Slide 1: Welcome / what it is
 * Slide 2: Scan → Classify → Master mechanic
 * Slide 3: Stages, streak, daily specimen + dismiss option
 */
import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { ONBOARDING_KEY } from '@/constants/storage';

const { width: SW, height: SH } = Dimensions.get('window');

// ── Slide data ────────────────────────────────────────────────────────────────

interface Slide {
  key: string;
  image: ReturnType<typeof require>;
  imageSize: number;
  tint?: string;
  title: string;
  body: string;
  accent: string;
}

const SLIDES: Slide[] = [
  {
    key: 'welcome',
    image: require('../assets/icon.png'),
    imageSize: 200,
    title: 'Welcome to\nEWW-NIVERSE',
    body: 'The grossest creature collection in the universe. Classify specimens, master the lab, and discover what really lurks in the dark.',
    accent: Colors.eww.green,
  },
  {
    key: 'classify',
    image: require('../assets/tab-explore.png'),
    imageSize: 150,
    tint: Colors.eww.amber,
    title: 'Scan.\nClassify. Master.',
    body: 'Use scans to unlock creature specimens. Answer correctly to classify — answer three times to master and earn full points. Scans refresh every 12 hours.',
    accent: Colors.eww.amber,
  },
  {
    key: 'stages',
    image: require('../assets/tab-rewards.png'),
    imageSize: 150,
    tint: Colors.eww.purple,
    title: 'Five Stages\nto Dr. Icky',
    body: 'Rise from Kinda Curious to Full Dr. Icky. Complete the Daily Specimen for double scan rewards. Keep your streak alive to earn bonus scans.',
    accent: Colors.eww.purple,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function Onboarding() {
  const flatListRef = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dontShow, setDontShow] = useState(false);

  const isLast = currentIndex === SLIDES.length - 1;

  const handleNext = () => {
    if (!isLast) {
      const next = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setCurrentIndex(next);
    }
  };

  const handleEnter = async () => {
    if (dontShow) {
      await AsyncStorage.setItem(ONBOARDING_KEY, '1');
    }
    router.replace('/(tabs)');
  };

  const renderSlide = ({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      {/* Hero area */}
      <View style={styles.heroArea}>
        <Image
          source={item.image}
          style={[
            styles.heroImage,
            { width: item.imageSize, height: item.imageSize },
            item.tint ? { tintColor: item.tint } : undefined,
          ]}
          resizeMode="contain"
        />
      </View>

      {/* Content card */}
      <View style={[styles.card, { borderTopColor: item.accent }]}>
        {/* Progress dots */}
        <View style={styles.dots}>
          {SLIDES.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === currentIndex
                  ? [styles.dotActive, { backgroundColor: item.accent }]
                  : styles.dotInactive,
              ]}
            />
          ))}
        </View>

        {/* Title */}
        <Text style={[styles.title, { color: item.accent }]}>{item.title}</Text>

        {/* Body */}
        <Text style={styles.body}>{item.body}</Text>

        {/* Last slide extras */}
        {item.key === 'stages' && (
          <TouchableOpacity
            style={styles.checkRow}
            onPress={() => setDontShow((v) => !v)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, dontShow && { backgroundColor: Colors.eww.green, borderColor: Colors.eww.greenDark }]}>
              {dontShow && <Text style={styles.checkmark}>✓</Text>}
            </View>
            <Text style={styles.checkLabel}>Don't show this again</Text>
          </TouchableOpacity>
        )}

        {/* CTA button */}
        {isLast ? (
          <TouchableOpacity
            style={[styles.ctaBtn, { backgroundColor: item.accent, borderColor: item.accent === Colors.eww.purple ? Colors.eww.purpleDark : Colors.eww.greenDark }]}
            onPress={handleEnter}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>ENTER THE LAB  ›</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.ctaBtn, { backgroundColor: item.accent, borderColor: item.accent === Colors.eww.amber ? '#A06010' : Colors.eww.greenDark }]}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>NEXT  ›</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <FlatList
        ref={flatListRef}
        data={SLIDES}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const idx = Math.round(e.nativeEvent.contentOffset.x / SW);
          setCurrentIndex(idx);
        }}
        renderItem={renderSlide}
        getItemLayout={(_, index) => ({
          length: SW,
          offset: SW * index,
          index,
        })}
      />
    </SafeAreaView>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const CARD_HEIGHT = SH * 0.56;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.bg.DEFAULT,
  },
  slide: {
    width: SW,
    flex: 1,
  },
  heroArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 16,
  },
  heroImage: {
    // size set inline per slide
  },

  // Parchment card bottom sheet
  card: {
    height: CARD_HEIGHT,
    backgroundColor: Colors.bg.parchment,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 3,
    paddingHorizontal: Spacing.lg,
    paddingTop: 24,
    paddingBottom: Platform.OS === 'android' ? 24 : 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 12,
  },

  dots: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },
  dot: {
    borderRadius: 5,
    height: 8,
  },
  dotActive: {
    width: 24,
  },
  dotInactive: {
    width: 8,
    backgroundColor: `${Colors.eww.tan}80`,
  },

  title: {
    fontFamily: FontFamily.creepster,
    fontSize: 34,
    lineHeight: 36,
    letterSpacing: 1,
    marginBottom: 12,
    // shadow matching website style
    textShadowColor: 'rgba(0,0,0,0.12)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  body: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 19,
    lineHeight: 27,
    color: Colors.eww.bark,
    letterSpacing: 0.2,
    flex: 1,
  },

  checkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
    marginTop: 4,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: Colors.eww.tan,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmark: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '900',
    lineHeight: 14,
  },
  checkLabel: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 14,
    color: Colors.eww.barkLight,
    letterSpacing: 0.3,
  },

  ctaBtn: {
    borderRadius: Radius.lg,
    borderWidth: 2.5,
    paddingVertical: 14,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 5,
    elevation: 5,
    shadowColor: '#000',
  },
  ctaText: {
    fontFamily: FontFamily.creepster,
    fontSize: 22,
    color: '#fff',
    letterSpacing: 1.5,
  },
});
