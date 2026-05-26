/**
 * Onboarding — 3-slide intro carousel shown on first launch.
 * Hero area: Dr. Icky video for each slide.
 * Bottom card: title, body, progress dots, CTA.
 */
import React, { useRef, useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VideoView, useVideoPlayer } from 'expo-video';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { ONBOARDING_KEY } from '@/constants/storage';

const { width: SW, height: SH } = Dimensions.get('window');

// ── Slide data ────────────────────────────────────────────────────────────────

interface Slide {
  key:    string;
  video:  ReturnType<typeof require>;
  title:  string;
  body:   string;
  accent: string;
}

const SLIDES: Slide[] = [
  {
    key:   'welcome',
    video: require('../assets/videos/welcome.mp4'),
    title: 'Welcome to\nEWW-NIVERSE',
    body:  'The grossest creature collection in the universe. Classify specimens, master the lab, and discover what really lurks in the dark.',
    accent: Colors.eww.green,
  },
  {
    key:   'classify',
    video: require('../assets/videos/classify.mp4'),
    title: 'Scan.\nClassify. Master.',
    body:  'Use scans to unlock creature specimens. Master each creature by acing its quiz — earn scans and badges. Scans refresh every 12 hours.',
    accent: Colors.eww.amber,
  },
  {
    key:   'use-scans',
    video: require('../assets/videos/use-scans.mp4'),
    title: 'Five Stages\nto Dr. Icky',
    body:  'Rise from Kinda Curious to Full Dr. Icky. Complete the Daily Specimen for double scan rewards. Keep your streak alive to earn bonus scans.',
    accent: Colors.eww.purple,
  },
];

// ── Video hero per slide ──────────────────────────────────────────────────────

function SlideVideoHero({ video }: { video: ReturnType<typeof require> }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const player = useVideoPlayer(video as any, (p) => {
    p.loop = true;
    p.muted = false;
    p.play();
  });

  return (
    <VideoView
      player={player}
      style={styles.heroVideo}
      contentFit="contain"
      nativeControls={false}
    />
  );
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function Onboarding() {
  const flatListRef   = useRef<FlatList>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [dontShow,    setDontShow]      = useState(false);

  const isLast = currentIndex === SLIDES.length - 1;

  const handleNext = useCallback(() => {
    if (!isLast) {
      const next = currentIndex + 1;
      flatListRef.current?.scrollToIndex({ index: next, animated: true });
      setCurrentIndex(next);
    }
  }, [isLast, currentIndex]);

  const handleEnter = useCallback(async () => {
    if (dontShow) {
      await AsyncStorage.setItem(ONBOARDING_KEY, '1');
    }
    router.replace('/(tabs)');
  }, [dontShow]);

  const renderSlide = useCallback(({ item }: { item: Slide }) => (
    <View style={styles.slide}>
      {/* Video hero */}
      <View style={styles.heroArea}>
        <SlideVideoHero video={item.video} />
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

        <Text style={[styles.title, { color: item.accent }]}>{item.title}</Text>
        <Text style={styles.body}>{item.body}</Text>

        {/* Last slide: "don't show again" */}
        {item.key === 'use-scans' && (
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

        {isLast ? (
          <TouchableOpacity
            style={[styles.ctaBtn, { backgroundColor: item.accent, borderColor: `${item.accent}aa` }]}
            onPress={handleEnter}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>ENTER THE LAB  ›</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={[styles.ctaBtn, { backgroundColor: item.accent, borderColor: `${item.accent}aa` }]}
            onPress={handleNext}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>NEXT  ›</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  ), [currentIndex, isLast, dontShow, handleNext, handleEnter]);

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

const CARD_HEIGHT = SH * 0.52;

const styles = StyleSheet.create({
  root: {
    flex:            1,
    backgroundColor: Colors.bg.DEFAULT,
  },
  slide: {
    width: SW,
    flex:  1,
  },
  heroArea: {
    flex:           1,
    alignItems:     'center',
    justifyContent: 'center',
  },
  heroVideo: {
    width:  SW,
    height: SH - CARD_HEIGHT,
  },

  card: {
    height:               CARD_HEIGHT,
    backgroundColor:      Colors.bg.parchment,
    borderTopLeftRadius:  28,
    borderTopRightRadius: 28,
    borderTopWidth:       3,
    paddingHorizontal:    Spacing.lg,
    paddingTop:           24,
    paddingBottom:        Platform.OS === 'android' ? 24 : 16,
    shadowColor:          '#000',
    shadowOffset:         { width: 0, height: -4 },
    shadowOpacity:        0.25,
    shadowRadius:         10,
    elevation:            12,
  },

  dots: {
    flexDirection: 'row',
    gap:           8,
    marginBottom:  18,
  },
  dot: {
    borderRadius: 5,
    height:       8,
  },
  dotActive:   { width: 24 },
  dotInactive: { width: 8, backgroundColor: `${Colors.eww.tan}80` },

  title: {
    fontFamily:    FontFamily.creepster,
    fontSize:      32,
    lineHeight:    34,
    letterSpacing: 1,
    marginBottom:  10,
  },
  body: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      18,
    lineHeight:    26,
    color:         Colors.eww.bark,
    letterSpacing: 0.2,
    flex:          1,
  },

  checkRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           10,
    marginBottom:  14,
    marginTop:     4,
  },
  checkbox: {
    width:           22,
    height:          22,
    borderRadius:    5,
    borderWidth:     2,
    borderColor:     Colors.eww.tan,
    backgroundColor: 'transparent',
    alignItems:      'center',
    justifyContent:  'center',
  },
  checkmark: {
    fontSize:   13,
    color:      '#fff',
    fontWeight: '900',
    lineHeight: 14,
  },
  checkLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      14,
    color:         Colors.eww.barkLight,
    letterSpacing: 0.3,
  },

  ctaBtn: {
    borderRadius:      Radius.lg,
    borderWidth:       2.5,
    paddingVertical:   14,
    alignItems:        'center',
    shadowOffset:      { width: 0, height: 3 },
    shadowOpacity:     0.35,
    shadowRadius:      5,
    elevation:         5,
    shadowColor:       '#000',
  },
  ctaText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      22,
    color:         '#fff',
    letterSpacing: 1.5,
  },
});
