/**
 * Recruit File tab — personal profile + HUD stats.
 * Shows: codename, stage badge, personal records, streak, contamination count.
 */
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Spacing, Radius } from '@/constants/design';
import { useUserStore } from '@/store/userStore';
import { STAGE_LABELS } from '@/constants/game';

export default function RecruitFile() {
  const profile = useUserStore((s) => s.profile);

  if (!profile) return null;

  const stageLabel = STAGE_LABELS[profile.eww_stage];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Identity header */}
        <View style={styles.identityCard}>
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarEmoji}>🧪</Text>
          </View>
          <Text style={styles.codename}>{profile.codename}</Text>
          <View style={styles.stageBadge}>
            <Text style={styles.stageLabel}>Stage {profile.eww_stage}</Text>
            <Text style={styles.stageName}>{stageLabel}</Text>
          </View>
          {!profile.is_paid && (
            <TouchableOpacity
              style={styles.upgradeBtn}
              onPress={() => router.push('/paywall')}
              activeOpacity={0.8}
            >
              <Text style={styles.upgradeBtnText}>Upgrade to Full Lab Pass →</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Personal Records */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Records</Text>
          <View style={styles.recordsGrid}>
            <RecordCard
              label="Classified"
              value={profile.classified_count}
              color={Colors.eww.green}
            />
            <RecordCard
              label="Mastered"
              value={profile.mastered_count}
              color={Colors.eww.gold}
            />
            <RecordCard
              label="Streak"
              value={profile.streak_days}
              suffix="days"
              color={Colors.eww.amber}
            />
            <RecordCard
              label="Events"
              value={profile.contamination_count}
              color={Colors.eww.coral}
            />
            <RecordCard
              label="Best Quiz"
              value={
                profile.fastest_quiz_seconds != null
                  ? profile.fastest_quiz_seconds
                  : '—'
              }
              suffix={profile.fastest_quiz_seconds != null ? 's' : ''}
              color={Colors.eww.purple}
            />
          </View>
        </View>

        {/* Stage progression */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Stage Progression</Text>
          {([1, 2, 3, 4, 5] as const).map((s) => (
            <StageRow
              key={s}
              stage={s}
              label={STAGE_LABELS[s]}
              current={profile.eww_stage === s}
              done={profile.eww_stage > s}
              locked={!profile.is_paid && s > 2}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function RecordCard({
  label,
  value,
  suffix = '',
  color,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  color: string;
}) {
  return (
    <View style={[styles.recordCard, { borderColor: `${color}33` }]}>
      <Text style={[styles.recordValue, { color }]}>
        {value}
        {suffix ? <Text style={styles.recordSuffix}> {suffix}</Text> : null}
      </Text>
      <Text style={styles.recordLabel}>{label}</Text>
    </View>
  );
}

function StageRow({
  stage,
  label,
  current,
  done,
  locked,
}: {
  stage: number;
  label: string;
  current: boolean;
  done: boolean;
  locked: boolean;
}) {
  return (
    <View
      style={[
        styles.stageRow,
        current && styles.stageRowCurrent,
        done && styles.stageRowDone,
      ]}
    >
      <View
        style={[
          styles.stageNum,
          { backgroundColor: done || current ? Colors.eww.green : Colors.bg.elevated },
        ]}
      >
        <Text style={styles.stageNumText}>{stage}</Text>
      </View>
      <View style={styles.stageInfo}>
        <Text style={[styles.stageLabel, done && { color: Colors.eww.green }]}>
          {label}
          {current ? '  ◀ current' : ''}
        </Text>
        {locked && <Text style={styles.stageLocked}>Full Lab Pass required</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg.DEFAULT },
  content: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },

  identityCard: {
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.sm,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.bg.elevated,
    borderWidth: 2,
    borderColor: Colors.eww.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 36 },
  codename: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.text.primary,
    letterSpacing: 1,
  },
  stageBadge: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    backgroundColor: `${Colors.eww.green}18`,
    borderRadius: Radius.full,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: Colors.eww.green,
  },
  stageLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.eww.greenLight,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  stageName: {
    fontSize: 13,
    color: Colors.text.secondary,
  },
  upgradeBtn: {
    backgroundColor: Colors.eww.green,
    borderRadius: Radius.full,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: Spacing.xs,
  },
  upgradeBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#000',
  },

  section: { marginTop: Spacing.lg },
  sectionTitle: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.text.muted,
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: Spacing.sm,
  },

  recordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  recordCard: {
    width: '47%',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.md,
    borderWidth: 1,
    padding: Spacing.md,
  },
  recordValue: {
    fontSize: 28,
    fontWeight: '800',
  },
  recordSuffix: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.text.muted,
  },
  recordLabel: {
    fontSize: 11,
    color: Colors.text.muted,
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    padding: Spacing.sm,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: 'transparent',
    marginBottom: 6,
    backgroundColor: Colors.bg.card,
  },
  stageRowCurrent: {
    borderColor: Colors.eww.green,
    backgroundColor: `${Colors.eww.green}12`,
  },
  stageRowDone: {
    opacity: 0.6,
  },
  stageNum: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageNumText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  stageInfo: { flex: 1 },
  stageLocked: {
    fontSize: 10,
    color: Colors.eww.amber,
    marginTop: 2,
  },
});
