/**
 * HOME — Lab HQ
 *
 * Layout:
 *   AppHeader → page header row → Daily Specimen hero
 *   → Daily Missions → Big quiz CTA → Stats bubbles
 *   → Quick nav → EWW-score gauge
 */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { useUserStore } from '@/store/userStore';
import { STAGE_LABELS } from '@/constants/game';
import { AppHeader } from '@/components/AppHeader';
import { DailySpecimenCard } from '@/components/DailySpecimenCard';

export default function Home() {
  const profile = useUserStore((s) => s.profile);

  if (!profile) return null;

  const stageLabel = STAGE_LABELS[profile.eww_stage];

  // EWW score derived from progress (weighted: 60% classified, 40% mastered)
  const totalCreatures = 75 + 80 + 79;
  const rawScore       = Math.min(
    100,
    Math.round(
      (profile.classified_count / Math.max(totalCreatures, 1)) * 60 +
      (profile.mastered_count   / Math.max(totalCreatures, 1)) * 40,
    ),
  );
  // Map to the 3 illustration tiers
  const ewwMeterImg =
    rawScore >= 80 ? Assets.ewwMeter100 :
    rawScore >= 40 ? Assets.ewwMeter80  :
    Assets.ewwMeter60;

  // Daily missions — tracked per-day via dedicated profile counters
  const missions = [
    {
      icon:     Assets.missionScan,
      label:    'CLASSIFY 3 SPECIMENS',
      current:  Math.min(profile.daily_classified_today ?? 0, 3),
      total:    3,
      reward:   '+2 SCANS',
    },
    {
      icon:     Assets.missionWarning,
      label:    'ANSWER 5 QUIZ QUESTIONS',
      current:  Math.min(profile.daily_quiz_answers_today ?? 0, 5),
      total:    5,
      reward:   '+1 SCAN',
    },
    {
      icon:     Assets.missionRare,
      label:    'FIND A RARE SPECIMEN',
      current:  profile.daily_rare_found ? 1 : 0,
      total:    1,
      reward:   '+3 SCANS',
    },
  ];

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppHeader />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Stage + codename row ──────────────────────────── */}
        <View style={styles.topRow}>
          <View style={styles.stageBadge}>
            <Text style={styles.stageText}>
              STAGE {profile.eww_stage}  ·  {stageLabel.toUpperCase()}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.codenameTag}
            onPress={() => router.push('/(tabs)/recruit-file')}
          >
            <Text style={styles.codenameText}>{profile.codename}</Text>
          </TouchableOpacity>
        </View>

        {/* ── HERO: Daily Specimen / Last Classified ─────── */}
        <DailySpecimenCard
          lastClaimed={profile.daily_specimen_last_claimed}
          isPaid={profile.is_paid}
          lastClassifiedId={profile.last_classified_creature_id ?? null}
          lastUnlockedSpecimenId={profile.last_unlocked_specimen_id ?? null}
        />

        {/* ── Daily Missions ──────────────────────────────── */}
        <View style={styles.missionsBlock}>
          <Text style={styles.missionsTitle}>DAILY MISSIONS</Text>
          {missions.map((m, i) => (
            <MissionRow
              key={i}
              icon={m.icon}
              label={m.label}
              current={m.current}
              total={m.total}
              reward={m.reward}
            />
          ))}
        </View>

        {/* ── Explore CTA ─────────────────────────────────── */}
        <TouchableOpacity
          style={styles.quizBtn}
          onPress={() => router.push('/(tabs)/collection')}
          activeOpacity={0.85}
        >
          <Text style={styles.quizLabel}>READY TO MASTER?</Text>
          <Text style={styles.quizCta}>EXPLORE SPECIMENS  ›</Text>
        </TouchableOpacity>

        {/* ── Progress stats ──────────────────────────────── */}
        <View style={styles.statsRow}>
          <StatBubble
            value={profile.classified_count}
            label="Found"
            color={Colors.eww.green}
          />
          <StatBubble
            value={profile.mastered_count}
            label="Mastered"
            color={Colors.eww.amber}
          />
          <StatBubble
            value={profile.contamination_count}
            label="Events"
            color={Colors.eww.purple}
          />
          <StatBubble
            value={profile.streak_days}
            label="Day Streak"
            color={Colors.eww.coral}
          />
        </View>

        {/* ── EWW-score gauge ─────────────────────────────── */}
        <View style={styles.ewwCard}>
          <Text style={styles.ewwTitle}>YOUR EWW SCORE</Text>
          <Image
            source={ewwMeterImg}
            style={styles.ewwMeterImg}
            resizeMode="contain"
          />
          <Text style={styles.ewwSub}>
            Classify more specimens to raise your score
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function MissionRow({
  icon,
  label,
  current,
  total,
  reward,
}: {
  icon: ReturnType<typeof require>;
  label: string;
  current: number;
  total: number;
  reward: string;
}) {
  const done = current >= total;
  const pct  = Math.min(current / total, 1);

  return (
    <View style={[styles.missionRow, done && styles.missionRowDone]}>
      <Image source={icon} style={styles.missionIcon} resizeMode="contain" />
      <View style={styles.missionBody}>
        <Text style={[styles.missionLabel, done && styles.missionLabelDone]}>
          {label}
        </Text>
        {/* Progress bar */}
        <View style={styles.missionTrack}>
          <View style={[styles.missionFill, { width: `${pct * 100}%` }]} />
        </View>
        <Text style={styles.missionCount}>
          {current} / {total}
        </Text>
      </View>
      <View style={[styles.missionReward, done && styles.missionRewardDone]}>
        <Text style={styles.missionRewardText}>{done ? '✓' : reward}</Text>
      </View>
    </View>
  );
}

function StatBubble({
  value,
  label,
  color,
}: {
  value: number;
  label: string;
  color: string;
}) {
  return (
    <View style={[styles.statBubble, { borderColor: `${color}40` }]}>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root:    { flex: 1, backgroundColor: Colors.bg.DEFAULT },
  scroll:  { flex: 1 },
  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom:     Spacing.xxl,
    paddingTop:        10,
    gap:               14,
  },

  // ── Top row ───────────────────────────────────────────────────────────────
  topRow: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    alignItems:     'center',
  },
  stageBadge: {
    backgroundColor: `${Colors.eww.green}18`,
    borderRadius:    Radius.full,
    borderWidth:     1,
    borderColor:     `${Colors.eww.green}55`,
    paddingHorizontal: 12,
    paddingVertical:   6,
  },
  stageText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    color:         Colors.text.lime,
    letterSpacing: 1,
  },
  codenameTag: {
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.full,
    paddingHorizontal: 14,
    paddingVertical:   6,
    borderWidth:       1,
    borderColor:       Colors.border.DEFAULT,
  },
  codenameText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      15,
    color:         Colors.text.lime,
    letterSpacing: 0.5,
  },

  // ── Missions ──────────────────────────────────────────────────────────────
  missionsBlock: {
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    borderColor:     Colors.border.subtle,
    padding:         Spacing.md,
    gap:             10,
  },
  missionsTitle: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.muted,
    letterSpacing: 2.5,
    marginBottom:  2,
  },
  missionRow: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           10,
  },
  missionRowDone: { opacity: 0.65 },
  missionIcon:    { width: 28, height: 28 },
  missionBody:    { flex: 1, gap: 3 },
  missionLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      17,
    color:         Colors.text.primary,
    letterSpacing: 0.8,
  },
  missionLabelDone: { color: Colors.text.muted },
  missionTrack: {
    height:          6,
    backgroundColor: Colors.bg.elevated,
    borderRadius:    Radius.full,
    overflow:        'hidden',
  },
  missionFill: {
    position:        'absolute',
    left:            0,
    top:             0,
    bottom:          0,
    backgroundColor: Colors.eww.green,
    borderRadius:    Radius.full,
  },
  missionCount: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   12,
    color:      Colors.text.muted,
  },
  missionReward: {
    backgroundColor:   `${Colors.eww.amber}20`,
    borderRadius:      Radius.full,
    paddingHorizontal: 8,
    paddingVertical:   4,
    borderWidth:       1,
    borderColor:       `${Colors.eww.amber}44`,
  },
  missionRewardDone: {
    backgroundColor: `${Colors.eww.green}20`,
    borderColor:     `${Colors.eww.green}44`,
  },
  missionRewardText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      13,
    color:         Colors.eww.amber,
    letterSpacing: 0.3,
  },

  // ── Quiz CTA ──────────────────────────────────────────────────────────────
  quizBtn: {
    backgroundColor: Colors.eww.amber,
    borderRadius:    Radius.lg,
    borderWidth:     3,
    borderColor:     '#A06010',
    paddingVertical: 16,
    paddingHorizontal: Spacing.md,
    alignItems:      'center',
    shadowColor:     '#A06010',
    shadowOffset:    { width: 0, height: 5 },
    shadowOpacity:   0.5,
    shadowRadius:    8,
    elevation:       8,
  },
  quizLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    color:         '#5C3200',
    letterSpacing: 2.5,
    marginBottom:  2,
  },
  quizCta: {
    fontFamily:    FontFamily.creepster,
    fontSize:      28,
    color:         '#2A1600',
    letterSpacing: 1.5,
  },

  // ── Stats row ─────────────────────────────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    gap:           8,
  },
  statBubble: {
    flex:            1,
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    alignItems:      'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    gap:             2,
  },
  statValue: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   24,
    lineHeight: 26,
  },
  statLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    color:         Colors.text.secondary,
    letterSpacing: 0.2,
    textAlign:     'center',
  },

  // ── EWW gauge ─────────────────────────────────────────────────────────────
  ewwCard: {
    backgroundColor: `${Colors.eww.green}0A`,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    borderColor:     `${Colors.eww.green}40`,
    paddingVertical:   16,
    paddingHorizontal: 12,
    alignItems:      'center',
    gap:             8,
  },
  ewwTitle: {
    fontFamily:    FontFamily.creepster,
    fontSize:      22,
    color:         Colors.text.lime,
    letterSpacing: 1.5,
  },
  ewwMeterImg: {
    width:  '100%',
    height: 180,
  },
  ewwSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   15,
    color:      Colors.text.secondary,
    textAlign:  'center',
  },
});
