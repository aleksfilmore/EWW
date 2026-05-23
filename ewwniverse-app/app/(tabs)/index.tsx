/**
 * HOME — Lab HQ
 *
 * Dark lab background. Parchment cards for content panels.
 * Branded header via AppHeader.
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
import { ParchmentCard } from '@/components/ParchmentCard';
import { SectionLabel } from '@/components/SectionLabel';
import { EwwMeterArc } from '@/components/EwwMeterArc';
import { HudStrip } from '@/components/HudStrip';
import { DailySpecimenCard } from '@/components/DailySpecimenCard';

export default function Home() {
  const profile = useUserStore((s) => s.profile);
  const refreshScanIfDue = useUserStore((s) => s.refreshScanIfDue);

  if (!profile) return null;

  const stageLabel = STAGE_LABELS[profile.eww_stage];
  // Derive a single eww score (0–100) from progress
  const totalCreatures = 75 + 80 + 79; // all books
  const ewwScore = Math.min(
    100,
    Math.round(
      (profile.classified_count / Math.max(totalCreatures, 1)) * 60 +
        (profile.mastered_count / Math.max(totalCreatures, 1)) * 40
    )
  );
  // Snap to nearest EWW-meter tier: 60 / 80 / 100
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
        {/* Stage tag + codename */}
        <View style={styles.stageRow}>
          <View style={styles.stageBadge}>
            <Text style={styles.stageText}>{stageLabel.toUpperCase()}</Text>
          </View>
          <TouchableOpacity
            style={styles.codenameTag}
            onPress={() => router.push('/(tabs)/recruit-file')}
          >
            <Text style={styles.codenameText}>{profile.codename}</Text>
          </TouchableOpacity>
        </View>

        {/* EWW-METER card */}
        <ParchmentCard style={styles.card}>
          <SectionLabel label="EWW-METER" />
          <EwwMeterArc value={ewwMeterValue} size={200} />
        </ParchmentCard>

        {/* HUD strip on dark bg */}
        <ParchmentCard style={styles.card} accentColor={Colors.eww.amber}>
          <SectionLabel label="LAB STATUS" variant="parchment" />
          <HudStrip
            scanBalance={profile.scan_balance}
            scanNextRefresh={profile.scan_next_refresh}
            streakDays={profile.streak_days}
            onRefreshCheck={refreshScanIfDue}
            dark={false}
          />
        </ParchmentCard>

        {/* Daily specimen */}
        <DailySpecimenCard
          lastClaimed={profile.daily_specimen_last_claimed}
          isPaid={profile.is_paid}
        />

        {/* Stats row */}
        <View style={styles.statsRow}>
          <StatCard
            value={profile.classified_count}
            label="Classified"
            color={Colors.eww.green}
            accent={Colors.eww.greenDark}
          />
          <StatCard
            value={profile.mastered_count}
            label="Mastered"
            color={Colors.eww.amber}
            accent='#A06010'
          />
          <StatCard
            value={profile.contamination_count}
            label="Events"
            color={Colors.eww.purple}
            accent={Colors.eww.purpleDark}
          />
        </View>

        {/* Mission CTA */}
        <TouchableOpacity
          style={styles.missionBtn}
          onPress={() => router.push('/quiz')}
          activeOpacity={0.85}
        >
          <Text style={styles.missionLabel}>READY FOR ACTION?</Text>
          <Text style={styles.missionCta}>START LAB QUIZ  ›</Text>
        </TouchableOpacity>

        {/* Quick actions */}
        <View style={styles.quickRow}>
          <QuickCard
            label="Specimen Files"
            sub={`${profile.classified_count} / 75 Creatures`}
            accentColor={Colors.eww.amber}
            onPress={() => router.push('/(tabs)/collection')}
          />
          <QuickCard
            label="Rewards"
            sub={`Stage ${profile.eww_stage} — ${stageLabel}`}
            accentColor={Colors.eww.purple}
            onPress={() => router.push('/(tabs)/recruit-file')}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({
  value,
  label,
  color,
  accent,
}: {
  value: number;
  label: string;
  color: string;
  accent: string;
}) {
  return (
    <ParchmentCard style={styles.statCard} accentColor={color}>
      <Text style={[styles.statValue, { color: accent }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </ParchmentCard>
  );
}

function QuickCard({
  label,
  sub,
  accentColor,
  onPress,
}: {
  label: string;
  sub: string;
  accentColor: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.quickCardWrapper}
    >
      <ParchmentCard style={styles.quickCard} accentColor={accentColor}>
        <Text style={[styles.quickLabel, { color: accentColor === Colors.eww.amber ? '#8C5C00' : Colors.eww.purpleDark }]}>
          {label}
        </Text>
        <Text style={styles.quickSub}>{sub}</Text>
      </ParchmentCard>
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
    paddingTop: Spacing.sm,
    gap: 12,
  },

  stageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  stageBadge: {
    backgroundColor: `${Colors.eww.forest}CC`,
    borderRadius: Radius.full,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: Colors.eww.greenDark,
  },
  stageText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 12,
    color: Colors.eww.greenLight,
    letterSpacing: 1,
  },
  codenameTag: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.border.DEFAULT,
  },
  codenameText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 13,
    color: Colors.eww.green,
    letterSpacing: 0.5,
  },

  card: {
    // gap handled by ScrollView contentContainerStyle gap
  },

  statsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
  },
  statValue: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 30,
  },
  statLabel: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 11,
    color: Colors.eww.barkLight,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },

  missionBtn: {
    backgroundColor: Colors.eww.amber,
    borderRadius: Radius.lg,
    borderWidth: 3,
    borderColor: '#A06010',
    paddingVertical: 14,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    shadowColor: '#A06010',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 6,
    elevation: 6,
  },
  missionLabel: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 11,
    color: '#5C3200',
    letterSpacing: 2,
    marginBottom: 2,
  },
  missionCta: {
    fontFamily: FontFamily.creepster,
    fontSize: 24,
    color: '#2A1600',
    letterSpacing: 1,
  },

  quickRow: {
    flexDirection: 'row',
    gap: 10,
  },
  quickCardWrapper: {
    flex: 1,
  },
  quickCard: {
    padding: 14,
  },
  quickLabel: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 16,
    fontWeight: '700',
  },
  quickSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 12,
    color: Colors.eww.barkLight,
    marginTop: 3,
  },
});
