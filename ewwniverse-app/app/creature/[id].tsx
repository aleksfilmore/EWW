/**
 * Creature detail screen.
 * Shows: image, EWW-meter arc, gross fact, bonus fact (mastered), classification CTA.
 */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { Colors, Spacing, Radius, ewwMeterColor } from '@/constants/design';
import { useUserStore } from '@/store/userStore';
import { getCreatureById } from '@/data/index';
import { EwwMeterArc } from '@/components/EwwMeterArc';
import { CreatureImage } from '@/components/CreatureImage';
import { EwwMeter } from '@/types/creature';

export default function CreatureDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const profile = useUserStore((s) => s.profile);
  const creatures = useUserStore((s) => s.creatures);
  const consumeScan = useUserStore((s) => s.consumeScan);
  const setCreatureState = useUserStore((s) => s.setCreatureState);

  const creature = getCreatureById(id ?? '');

  if (!creature || !profile) {
    return (
      <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backLabel}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.errorText}>Specimen not found.</Text>
      </SafeAreaView>
    );
  }

  const userCreature = creatures[creature.id];
  const state = userCreature?.state ?? 'locked';
  const isClassified = state === 'classified' || state === 'mastered';

  const ewwColor = ewwMeterColor(creature.eww_meter as EwwMeter);

  const creatureId = creature?.id ?? '';

  function handleClassify() {
    if (!creatureId || isClassified) return;
    if (state === 'locked') {
      const success = consumeScan();
      if (!success) {
        Alert.alert(
          'No scans available',
          'Play the Lab Quiz to earn more scans, or wait for your next free scan.',
          [
            { text: 'Play Quiz', onPress: () => router.push('/quiz') },
            { text: 'OK' },
          ],
        );
        return;
      }
      setCreatureState(creatureId, 'silhouette');
      // After reveal animation, move to classified
      setTimeout(() => setCreatureState(creatureId, 'classified'), 1200);
    }
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      {/* Back button */}
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backLabel}>← Back</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Creature image */}
        <View style={styles.imageContainer}>
          <CreatureImage
            creature={creature}
            state={state}
            size={240}
          />
        </View>

        {/* EWW-meter arc */}
        <View style={styles.meterContainer}>
          <EwwMeterArc
            value={creature.eww_meter as EwwMeter}
            size={140}
          />
        </View>

        {/* Title + book */}
        <Text style={styles.title}>{isClassified ? creature.title : '???'}</Text>
        <Text style={styles.bookLabel}>{creature.book.replace(/-/g, ' ')}</Text>
        {creature.realm && (
          <View style={[styles.realmBadge, { borderColor: `${ewwColor}44` }]}>
            <Text style={[styles.realmText, { color: ewwColor }]}>{creature.realm}</Text>
          </View>
        )}

        {/* Gross fact */}
        {isClassified ? (
          <View style={[styles.factCard, { borderColor: `${ewwColor}33` }]}>
            <Text style={styles.factLabel}>GROSS FACT</Text>
            <Text style={styles.factText}>{creature.gross_fact}</Text>
          </View>
        ) : (
          <View style={styles.lockedFact}>
            <Text style={styles.lockedText}>Classify to unlock gross facts</Text>
          </View>
        )}

        {/* Classify CTA */}
        {!isClassified && (
          <TouchableOpacity
            style={[styles.classifyBtn, { backgroundColor: Colors.eww.green }]}
            onPress={handleClassify}
            activeOpacity={0.8}
          >
            <Text style={styles.classifyBtnText}>
              {state === 'locked' ? `USE SCAN  (${profile.scan_balance} left)` : 'CLASSIFYING...'}
            </Text>
          </TouchableOpacity>
        )}

        {isClassified && (
          <View style={styles.classifiedBadge}>
            <Text style={styles.classifiedBadgeText}>
              {state === 'mastered' ? '★ MASTERED' : '✓ CLASSIFIED'}
            </Text>
          </View>
        )}

        {/* Quiz CTA — encourages mastery */}
        {isClassified && state !== 'mastered' && (
          <TouchableOpacity
            style={styles.quizPrompt}
            onPress={() => router.push('/quiz')}
            activeOpacity={0.8}
          >
            <Text style={styles.quizPromptText}>
              Play Lab Quiz to master this specimen →
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg.DEFAULT },
  backBtn: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  backLabel: {
    fontSize: 15,
    color: Colors.eww.green,
    fontWeight: '600',
  },
  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xl,
    alignItems: 'center',
  },
  imageContainer: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  meterContainer: {
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 4,
  },
  bookLabel: {
    fontSize: 12,
    color: Colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: Spacing.sm,
  },
  realmBadge: {
    borderWidth: 1,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginBottom: Spacing.md,
  },
  realmText: {
    fontSize: 12,
    fontWeight: '600',
  },
  factCard: {
    width: '100%',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.md,
    marginBottom: Spacing.md,
  },
  factLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: Colors.text.muted,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  factText: {
    fontSize: 15,
    color: Colors.text.secondary,
    lineHeight: 22,
  },
  lockedFact: {
    width: '100%',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    alignItems: 'center',
  },
  lockedText: {
    fontSize: 13,
    color: Colors.text.disabled,
    fontStyle: 'italic',
  },
  classifyBtn: {
    width: '100%',
    borderRadius: Radius.full,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  classifyBtnText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  classifiedBadge: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.eww.green,
    marginBottom: Spacing.sm,
  },
  classifiedBadgeText: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.eww.green,
    letterSpacing: 1,
  },
  quizPrompt: {
    paddingVertical: 12,
  },
  quizPromptText: {
    fontSize: 13,
    color: Colors.eww.amber,
    fontWeight: '600',
  },
  errorText: {
    color: Colors.text.muted,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 60,
  },
});
