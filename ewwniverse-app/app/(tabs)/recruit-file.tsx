/**
 * REWARDS — Recruit File
 * Level badge, personal records, stage progression.
 * Parchment cards on dark lab background.
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
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { useUserStore } from '@/store/userStore';
import { STAGE_LABELS } from '@/constants/game';
import { AppHeader } from '@/components/AppHeader';
import { ParchmentCard } from '@/components/ParchmentCard';
import { SectionLabel } from '@/components/SectionLabel';

export default function Rewards() {
  const profile = useUserStore((s) => s.profile);

  if (!profile) return null;

  const stageLabel = STAGE_LABELS[profile.eww_stage];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppHeader />
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Identity card */}
        <ParchmentCard accentColor={Colors.eww.green} style={styles.identityCard}>
          <View style={styles.identityInner}>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarEmoji}>🧪</Text>
            </View>
            <View style={styles.identityText}>
              <Text style={styles.codenameLabel}>RECRUIT</Text>
              <Text style={styles.codename}>{profile.codename}</Text>
              <View style={styles.stagePill}>
                <Text style={styles.stageNum}>STAGE {profile.eww_stage}</Text>
                <Text style={styles.stageName}>{stageLabel}</Text>
              </View>
            </View>
          </View>
          {!profile.is_paid && (
            <TouchableOpacity
              style={styles.upgradeBtn}
              onPress={() => router.push('/paywall')}
              activeOpacity={0.8}
            >
              <Text style={styles.upgradeBtnText}>
                UNLOCK FULL LAB PASS  ›
              </Text>
            </TouchableOpacity>
          )}
        </ParchmentCard>

        {/* Personal Records */}
        <ParchmentCard accentColor={Colors.eww.amber} style={styles.section}>
          <SectionLabel label="PERSONAL RECORDS" />
          <View style={styles.recordsGrid}>
            <RecordCard
              label="Classified"
              value={profile.classified_count}
              color={Colors.eww.forest}
              accent={Colors.eww.green}
            />
            <RecordCard
              label="Mastered"
              value={profile.mastered_count}
              color={Colors.eww.forest}
              accent={Colors.eww.amber}
            />
            <RecordCard
              label="Streak"
              value={profile.streak_days}
              suffix="days"
              color={Colors.eww.forest}
              accent='#A06010'
            />
            <RecordCard
              label="Events"
              value={profile.contamination_count}
              color={Colors.eww.forest}
              accent={Colors.eww.purple}
            />
          </View>
        </ParchmentCard>

        {/* Stage progression */}
        <ParchmentCard accentColor={Colors.eww.purple} style={styles.section}>
          <SectionLabel label="STAGE PROGRESSION" />
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
        </ParchmentCard>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function RecordCard({
  label,
  value,
  suffix = '',
  color,
  accent,
}: {
  label: string;
  value: number | string;
  suffix?: string;
  color: string;
  accent: string;
}) {
  return (
    <View style={[styles.recordCard, { borderColor: `${accent}40` }]}>
      <Text style={[styles.recordValue, { color: accent }]}>
        {value}
        {suffix ? <Text style={styles.recordSuffix}> {suffix}</Text> : null}
      </Text>
      <Text style={[styles.recordLabel, { color }]}>{label}</Text>
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
          styles.stageCircle,
          {
            backgroundColor: done
              ? Colors.eww.forest
              : current
              ? Colors.eww.green
              : `${Colors.eww.barkLight}40`,
            borderColor: done || current ? Colors.eww.greenDark : Colors.eww.tan,
          },
        ]}
      >
        <Text style={[styles.stageCircleText, { color: done || current ? '#fff' : Colors.eww.barkLight }]}>
          {stage}
        </Text>
      </View>
      <View style={styles.stageInfo}>
        <Text
          style={[
            styles.stageLabel,
            done && styles.stageLabelDone,
            current && styles.stageLabelCurrent,
          ]}
        >
          {label}{current ? '  ◀' : ''}
        </Text>
        {locked && (
          <Text style={styles.stageLockNote}>Full Lab Pass required</Text>
        )}
      </View>
    </View>
  );
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg.DEFAULT },
  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.xxl,
    paddingTop: Spacing.sm,
    gap: 12,
  },

  identityCard: {},
  identityInner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  avatarCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: `${Colors.eww.greenDark}22`,
    borderWidth: 2.5,
    borderColor: Colors.eww.green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarEmoji: { fontSize: 34 },
  identityText: { flex: 1 },
  codenameLabel: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 10,
    color: Colors.text.onParchmentMuted,
    letterSpacing: 2,
    marginBottom: 1,
  },
  codename: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 22,
    color: Colors.text.onParchment,
    letterSpacing: 0.5,
  },
  stagePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
    backgroundColor: `${Colors.eww.forest}18`,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.eww.greenDark,
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  stageNum: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 11,
    color: Colors.eww.greenDark,
    letterSpacing: 1,
  },
  stageName: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 11,
    color: Colors.eww.barkLight,
  },
  upgradeBtn: {
    marginTop: 12,
    backgroundColor: Colors.eww.green,
    borderRadius: Radius.lg,
    borderWidth: 2,
    borderColor: Colors.eww.greenDark,
    paddingVertical: 10,
    paddingHorizontal: Spacing.md,
    alignItems: 'center',
    shadowColor: Colors.eww.greenDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  upgradeBtnText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 15,
    color: '#fff',
    letterSpacing: 1,
  },

  section: {},

  recordsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  recordCard: {
    width: '47%',
    backgroundColor: Colors.bg.parchmentLight,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    padding: 12,
  },
  recordValue: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 30,
  },
  recordSuffix: {
    fontSize: 14,
    color: Colors.text.onParchmentMuted,
  },
  recordLabel: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 11,
    marginTop: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },

  stageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    borderRadius: Radius.md,
    borderWidth: 1.5,
    borderColor: `${Colors.eww.tan}60`,
    marginBottom: 6,
    backgroundColor: Colors.bg.parchmentLight,
  },
  stageRowCurrent: {
    borderColor: Colors.eww.green,
    backgroundColor: `${Colors.eww.greenDark}15`,
  },
  stageRowDone: {
    opacity: 0.65,
  },
  stageCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stageCircleText: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 14,
  },
  stageInfo: { flex: 1 },
  stageLabel: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 14,
    color: Colors.text.onParchmentSub,
  },
  stageLabelCurrent: {
    color: Colors.eww.forest,
    fontWeight: '700',
  },
  stageLabelDone: {
    color: Colors.eww.greenDark,
  },
  stageLockNote: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 10,
    color: Colors.eww.amber,
    marginTop: 1,
  },
});
