/**
 * HOME — Lab HQ
 *
 * Layout:
 *   AppHeader → page header row → Daily Specimen hero
 *   → Daily Missions → Big quiz CTA → Stats bubbles
 *   → Quick nav → EWW-score gauge
 */
import { useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageSourcePropType,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { useUserStore } from '@/store/userStore';
import { STAGE_LABELS } from '@/constants/game';
import { AppHeader } from '@/components/AppHeader';
import { DailySpecimenCard } from '@/components/DailySpecimenCard';
import { ALL_CREATURES } from '@/data/index';

const TOTAL_CREATURES = ALL_CREATURES.length; // 234 (75 creatures + 80 dinos + 79 earth)

export default function Home() {
  const profile = useUserStore((s) => s.profile);

  if (!profile) return null;

  const stageLabel = STAGE_LABELS[profile.eww_stage];

  // EWW score: square-root curve so early progress feels fast.
  // 100% = all creatures classified AND mastered (full paid tier).
  const linearProgress  =
    (profile.classified_count * 0.35 + profile.mastered_count * 0.65) / TOTAL_CREATURES;
  const ewwScore = Math.min(100, Math.round(Math.sqrt(linearProgress) * 100));

  // Daily missions — tracked per-day via dedicated profile counters
  // Rewards are granted automatically in the store when conditions are met
  const missions = [
    {
      icon:     Assets.missionScan,
      label:    'CLASSIFY 3 SPECIMENS',
      current:  Math.min(profile.daily_classified_today ?? 0, 3),
      total:    3,
      reward:   '+2 SCANS',
      claimed:  profile.daily_mission_classify_done ?? false,
    },
    {
      icon:     Assets.missionWarning,
      label:    'ANSWER 5 QUIZ QUESTIONS',
      current:  Math.min(profile.daily_quiz_answers_today ?? 0, 5),
      total:    5,
      reward:   '+1 SCAN',
      claimed:  profile.daily_mission_quiz_done ?? false,
    },
    {
      icon:     Assets.missionRare,
      label:    'FIND A RARE SPECIMEN',
      current:  profile.daily_rare_found ? 1 : 0,
      total:    1,
      reward:   '+3 SCANS',
      claimed:  profile.daily_mission_rare_done ?? false,
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
              claimed={m.claimed}
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
        <EwwScoreGauge
          score={ewwScore}
          classified={profile.classified_count}
          mastered={profile.mastered_count}
          total={TOTAL_CREATURES}
        />
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
  claimed,
}: {
  icon: ImageSourcePropType;
  label: string;
  current: number;
  total: number;
  reward: string;
  claimed: boolean;
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
      <View style={[styles.missionReward, (done || claimed) && styles.missionRewardDone]}>
        <Text style={styles.missionRewardText}>{claimed ? '✓ CLAIMED' : done ? '✓' : reward}</Text>
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

function EwwScoreGauge({
  score,
  classified,
  mastered,
  total,
}: {
  score: number;
  classified: number;
  mastered: number;
  total: number;
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(anim, {
      toValue:         score / 100,
      friction:        7,
      tension:         30,
      useNativeDriver: false,
    }).start();
  }, [score]);

  const fillColor =
    score >= 66 ? Colors.eww.coral :
    score >= 33 ? Colors.eww.amber :
    Colors.eww.green;

  const zone =
    score >= 66 ? 'DR. ICKY TERRITORY' :
    score >= 33 ? 'PROPERLY SLIMY'     :
    'KINDA CURIOUS';

  return (
    <View style={styles.ewwCard}>
      {/* Header row */}
      <View style={styles.ewwHeader}>
        <Text style={styles.ewwTitle}>YOUR EWW SCORE</Text>
        <View style={[styles.ewwScorePill, { borderColor: `${fillColor}66`, backgroundColor: `${fillColor}18` }]}>
          <Text style={[styles.ewwScoreNum, { color: fillColor }]}>{score}%</Text>
        </View>
      </View>

      {/* Zone label */}
      <Text style={[styles.ewwZoneLabel, { color: fillColor }]}>
        ☣  {zone}
      </Text>

      {/* Animated fill bar */}
      <View style={styles.ewwTrack}>
        {/* Subtle tinted zones in the track */}
        <View style={[styles.ewwZoneTint, { left: 0, width: '33.3%', backgroundColor: `${Colors.eww.green}15` }]} />
        <View style={[styles.ewwZoneTint, { left: '33.3%', width: '33.4%', backgroundColor: `${Colors.eww.amber}15` }]} />
        <View style={[styles.ewwZoneTint, { left: '66.7%', width: '33.3%', backgroundColor: `${Colors.eww.coral}15` }]} />

        {/* Animated slime fill */}
        <Animated.View
          style={[
            styles.ewwFill,
            {
              width:           anim.interpolate({ inputRange: [0, 1], outputRange: ['0%', '100%'] }),
              backgroundColor: fillColor,
              shadowColor:     fillColor,
            },
          ]}
        />

        {/* Zone dividers */}
        <View style={[styles.ewwDivider, { left: '33.3%' }]} />
        <View style={[styles.ewwDivider, { left: '66.7%' }]} />
      </View>

      {/* Zone labels under bar */}
      <View style={styles.ewwBarLabels}>
        <Text style={[styles.ewwBarLabel, { color: `${Colors.eww.green}80` }]}>CURIOUS</Text>
        <Text style={[styles.ewwBarLabel, { color: `${Colors.eww.amber}80` }]}>SLIMY</Text>
        <Text style={[styles.ewwBarLabel, { color: `${Colors.eww.coral}80` }]}>DR. ICKY</Text>
      </View>

      {/* Stats */}
      <Text style={styles.ewwStats}>
        {classified} classified · {mastered} mastered / {total} total
      </Text>
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
    backgroundColor: `${Colors.eww.green}08`,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    borderColor:     `${Colors.eww.green}30`,
    padding:         Spacing.md,
    gap:             10,
  },
  ewwHeader: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
  },
  ewwTitle: {
    fontFamily:    FontFamily.creepster,
    fontSize:      22,
    color:         Colors.text.lime,
    letterSpacing: 1.5,
  },
  ewwScorePill: {
    borderRadius:      Radius.full,
    borderWidth:       1.5,
    paddingHorizontal: 14,
    paddingVertical:   5,
  },
  ewwScoreNum: {
    fontFamily:    FontFamily.creepster,
    fontSize:      24,
    letterSpacing: 1,
  },
  ewwZoneLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      13,
    letterSpacing: 1.2,
    marginTop:     -4,
  },
  ewwTrack: {
    height:          26,
    borderRadius:    Radius.full,
    backgroundColor: Colors.bg.elevated,
    borderWidth:     1,
    borderColor:     Colors.border.subtle,
    overflow:        'hidden',
    position:        'relative',
  },
  ewwZoneTint: {
    position: 'absolute',
    top:      0,
    bottom:   0,
  },
  ewwFill: {
    position:      'absolute',
    left:          0,
    top:           0,
    bottom:        0,
    shadowOffset:  { width: 0, height: 0 },
    shadowOpacity: 0.55,
    shadowRadius:  8,
  },
  ewwDivider: {
    position:        'absolute',
    top:             0,
    bottom:          0,
    width:           1,
    backgroundColor: 'rgba(255,255,255,0.10)',
  },
  ewwBarLabels: {
    flexDirection:  'row',
    justifyContent: 'space-between',
    marginTop:      -2,
  },
  ewwBarLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      10,
    letterSpacing: 0.8,
  },
  ewwStats: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   14,
    color:      Colors.text.muted,
    textAlign:  'center',
    marginTop:  2,
  },
});
