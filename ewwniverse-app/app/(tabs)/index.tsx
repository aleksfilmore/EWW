/**
 * Lab HQ — home tab.
 * Shows: scan button, scan balance, daily specimen, streak, active missions.
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
import { Colors, Spacing, Radius } from '@/constants/design';
import { useUserStore } from '@/store/userStore';
import { STAGE_LABELS, SCAN_REFRESH_MS } from '@/constants/game';
import { ScanButton } from '@/components/ScanButton';
import { EwwMeterArc } from '@/components/EwwMeterArc';
import { DailySpecimenCard } from '@/components/DailySpecimenCard';
import { HudStrip } from '@/components/HudStrip';

export default function LabHQ() {
  const profile = useUserStore((s) => s.profile);
  const refreshScanIfDue = useUserStore((s) => s.refreshScanIfDue);

  if (!profile) return null;

  const stageLabel = STAGE_LABELS[profile.eww_stage];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>DR. ICKY'S LAB</Text>
            <Text style={styles.stage}>{stageLabel}</Text>
          </View>
          <TouchableOpacity
            style={styles.codenameTag}
            onPress={() => router.push('/(tabs)/recruit-file')}
          >
            <Text style={styles.codename}>{profile.codename}</Text>
          </TouchableOpacity>
        </View>

        {/* HUD strip — scans + streak */}
        <HudStrip
          scanBalance={profile.scan_balance}
          scanNextRefresh={profile.scan_next_refresh}
          streakDays={profile.streak_days}
          onRefreshCheck={refreshScanIfDue}
        />

        {/* Scan button — the main CTA */}
        <ScanButton
          scanBalance={profile.scan_balance}
          onPress={() => router.push('/creature/scan')}
        />

        {/* Daily Specimen */}
        <DailySpecimenCard
          lastClaimed={profile.daily_specimen_last_claimed}
          isPaid={profile.is_paid}
        />

        {/* Progress summary */}
        <View style={styles.progressRow}>
          <StatChip
            value={profile.classified_count}
            label="Classified"
            color={Colors.eww.green}
          />
          <StatChip
            value={profile.mastered_count}
            label="Mastered"
            color={Colors.eww.gold}
          />
          <StatChip
            value={profile.contamination_count}
            label="Events"
            color={Colors.eww.coral}
          />
        </View>

        {/* Quick actions */}
        <View style={styles.quickActions}>
          <QuickAction
            label="Lab Quiz"
            sub="Earn scans + classify"
            onPress={() => router.push('/quiz')}
            accent={Colors.eww.green}
          />
          <QuickAction
            label="Collection"
            sub={`${profile.classified_count} / 75 Creatures`}
            onPress={() => router.push('/(tabs)/collection')}
            accent={Colors.eww.amber}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function StatChip({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  return (
    <View style={[styles.statChip, { borderColor: `${color}33` }]}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function QuickAction({
  label,
  sub,
  onPress,
  accent,
}: {
  label: string;
  sub: string;
  onPress: () => void;
  accent: string;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.qaCard, { borderColor: `${accent}33` }]}
      activeOpacity={0.75}
    >
      <Text style={[styles.qaLabel, { color: accent }]}>{label}</Text>
      <Text style={styles.qaSub}>{sub}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg.DEFAULT },
  scroll: { flex: 1 },
  content: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  greeting: {
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 2,
    color: Colors.eww.green,
    textTransform: 'uppercase',
  },
  stage: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text.primary,
    marginTop: 2,
  },
  codenameTag: {
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.full,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.border.DEFAULT,
  },
  codename: {
    fontSize: 12,
    color: Colors.eww.green,
    fontWeight: '600',
    letterSpacing: 0.5,
  },

  progressRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  statChip: {
    flex: 1,
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    paddingVertical: Spacing.sm,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '800',
  },
  statLabel: {
    fontSize: 10,
    color: Colors.text.muted,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  quickActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  qaCard: {
    flex: 1,
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    padding: Spacing.md,
  },
  qaLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  qaSub: {
    fontSize: 12,
    color: Colors.text.muted,
    marginTop: 4,
  },
});
