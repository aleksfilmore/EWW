/**
 * HOME — Lab HQ
 *
 * Kid-friendly layout: daily creature challenge front and centre,
 * big quiz CTA, compact stats strip, EWW-score gauge at the bottom.
 */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { useUserStore } from '@/store/userStore';
import { STAGE_LABELS } from '@/constants/game';
import { AppHeader } from '@/components/AppHeader';
import { EwwMeterArc } from '@/components/EwwMeterArc';
import { HudStrip } from '@/components/HudStrip';
import { DailySpecimenCard } from '@/components/DailySpecimenCard';

export default function Home() {
  const profile = useUserStore((s) => s.profile);
  const refreshScanIfDue = useUserStore((s) => s.refreshScanIfDue);

  if (!profile) return null;

  const stageLabel = STAGE_LABELS[profile.eww_stage];

  // EWW score derived from progress (0–100), snapped to gauge tiers
  const totalCreatures = 75 + 80 + 79;
  const ewwScore = Math.min(
    100,
    Math.round(
      (profile.classified_count / Math.max(totalCreatures, 1)) * 60 +
        (profile.mastered_count / Math.max(totalCreatures, 1)) * 40,
    ),
  );
  const ewwMeterValue: 60 | 80 | 100 =
    ewwScore >= 80 ? 100 : ewwScore >= 40 ? 80 : 60;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Stage + codename row */}
        <View style={styles.topRow}>
          <View style={styles.stageBadge}>
            <Text style={styles.stageEmoji}>🔬</Text>
            <Text style={styles.stageText}>{stageLabel.toUpperCase()}</Text>
          </View>
          <TouchableOpacity
            style={styles.codenameTag}
            onPress={() => router.push('/(tabs)/recruit-file')}
          >
            <Text style={styles.codenameText}>{profile.codename}</Text>
          </TouchableOpacity>
        </View>

        {/* ── HERO: Daily Specimen ─────────────────────────── */}
        <DailySpecimenCard
          lastClaimed={profile.daily_specimen_last_claimed}
          isPaid={profile.is_paid}
        />

        {/* ── Big quiz CTA ─────────────────────────────────── */}
        <TouchableOpacity
          style={styles.quizBtn}
          onPress={() => router.push('/quiz')}
          activeOpacity={0.85}
        >
          <Text style={styles.quizLabel}>READY TO PLAY?</Text>
          <Text style={styles.quizCta}>START THE QUIZ  ›</Text>
        </TouchableOpacity>

        {/* ── Scan / streak strip ──────────────────────────── */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>YOUR LAB STATUS</Text>
        </View>
        <HudStrip
          scanBalance={profile.scan_balance}
          scanNextRefresh={profile.scan_next_refresh}
          streakDays={profile.streak_days}
          onRefreshCheck={refreshScanIfDue}
          dark
        />

        {/* ── Progress stats ───────────────────────────────── */}
        <View style={styles.statsRow}>
          <StatBubble
            value={profile.classified_count}
            label="Found"
            emoji="🦠"
            color={Colors.eww.green}
          />
          <StatBubble
            value={profile.mastered_count}
            label="Mastered"
            emoji="⭐"
            color={Colors.eww.amber}
          />
          <StatBubble
            value={profile.contamination_count}
            label="Events"
            emoji="☣️"
            color={Colors.eww.purple}
          />
        </View>

        {/* ── Quick nav cards ──────────────────────────────── */}
        <View style={styles.quickRow}>
          <QuickCard
            emoji="📖"
            label="Specimen Files"
            sub={`${profile.classified_count} / 75 creatures`}
            color={Colors.eww.green}
            onPress={() => router.push('/(tabs)/collection')}
          />
          <QuickCard
            emoji="🏆"
            label="Rewards"
            sub={`Stage ${profile.eww_stage}`}
            color={Colors.eww.purple}
            onPress={() => router.push('/(tabs)/recruit-file')}
          />
        </View>

        {/* ── EWW score at bottom ──────────────────────────── */}
        <View style={styles.ewwCard}>
          <Text style={styles.ewwTitle}>YOUR EWW SCORE</Text>
          <Text style={styles.ewwSub}>
            Classifying more creatures raises your score
          </Text>
          <EwwMeterArc value={ewwMeterValue} size={160} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatBubble({
  value,
  label,
  emoji,
  color,
}: {
  value: number;
  label: string;
  emoji: string;
  color: string;
}) {
  return (
    <View style={[styles.statBubble, { borderColor: `${color}40` }]}>
      <Text style={styles.statEmoji}>{emoji}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function QuickCard({
  emoji,
  label,
  sub,
  color,
  onPress,
}: {
  emoji: string;
  label: string;
  sub: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={[styles.quickCard, { borderColor: `${color}50` }]}
    >
      <Text style={styles.quickEmoji}>{emoji}</Text>
      <Text style={[styles.quickLabel, { color }]}>{label}</Text>
      <Text style={styles.quickSub}>{sub}</Text>
    </TouchableOpacity>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg.DEFAULT },
  scroll: { flex: 1 },
  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
    paddingTop: 10,
    gap: 14,
  },

  // Stage row
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stageBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: `${Colors.eww.forest}CC`,
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1.5,
    borderColor: Colors.eww.greenDark,
  },
  stageEmoji: { fontSize: 14 },
  stageText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 13,
    color: Colors.eww.greenLight,
    letterSpacing: 0.8,
  },
  codenameTag: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border.DEFAULT,
  },
  codenameText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 13,
    color: Colors.eww.green,
    letterSpacing: 0.5,
  },

  // Quiz CTA
  quizBtn: {
    backgroundColor: Colors.eww.amber,
    borderRadius: Radius.lg,
    borderWidth: 3,
    borderColor: '#A06010',
    paddingVertical: 16,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    shadowColor: '#A06010',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  quizLabel: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 12,
    color: '#5C3200',
    letterSpacing: 2.5,
    marginBottom: 2,
  },
  quizCta: {
    fontFamily: FontFamily.creepster,
    fontSize: 28,
    color: '#2A1600',
    letterSpacing: 1.5,
  },

  // Section header
  sectionHeader: {
    marginBottom: -4,
  },
  sectionTitle: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 12,
    color: Colors.text.muted,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
  },

  // Stat bubbles
  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statBubble: {
    flex: 1,
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 6,
    gap: 2,
  },
  statEmoji: { fontSize: 22 },
  statValue: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 30,
  },
  statLabel: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 12,
    color: Colors.text.secondary,
    letterSpacing: 0.3,
  },

  // Quick nav cards
  quickRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickCard: {
    flex: 1,
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    padding: 14,
    alignItems: 'flex-start',
    gap: 4,
  },
  quickEmoji: { fontSize: 26 },
  quickLabel: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 16,
    fontWeight: '700',
  },
  quickSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 12,
    color: Colors.text.secondary,
  },

  // EWW-score card (bottom)
  ewwCard: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border.subtle,
    padding: 16,
    alignItems: 'center',
    gap: 4,
  },
  ewwTitle: {
    fontFamily: FontFamily.creepster,
    fontSize: 22,
    color: Colors.eww.green,
    letterSpacing: 1.5,
  },
  ewwSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 13,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 6,
  },
});
