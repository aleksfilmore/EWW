/**
 * RECRUIT FILE — Rewards & Stage Progression
 *
 * Dark-purple lab aesthetic (no parchment).
 * Stage ladder with illustrated icons, streak jar, contamination event,
 * Full Lab Pass upsell card.
 */
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { useUserStore } from '@/store/userStore';
import { STAGE_LABELS } from '@/constants/game';
import { AppHeader } from '@/components/AppHeader';

const { width: SCREEN_W } = Dimensions.get('window');

const STAGE_ICONS = [
  Assets.stage1,
  Assets.stage2,
  Assets.stage3,
  Assets.stage4,
  Assets.stage5,
] as const;

export default function Rewards() {
  const profile = useUserStore((s) => s.profile);

  if (!profile) return null;

  const currentStage = profile.eww_stage;

  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <AppHeader />

      {/* Page title */}
      <View style={styles.titleBlock}>
        <Text style={styles.pageTitle}>RECRUIT FILE</Text>
        <Text style={styles.pageSub}>☣ STAGE PROGRESSION · REWARDS ☣</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* ── Identity badge ───────────────────────────────────── */}
        <View style={styles.identityCard}>
          <View style={styles.identityLeft}>
            <Text style={styles.identityLabel}>RECRUIT</Text>
            <Text style={styles.identityName}>{profile.codename}</Text>
            <View style={styles.stagePill}>
              <Text style={styles.stagePillText}>
                STAGE {currentStage}  ·  {STAGE_LABELS[currentStage].toUpperCase()}
              </Text>
            </View>
          </View>
          <Image
            source={STAGE_ICONS[currentStage - 1]}
            style={styles.stageIcon}
            resizeMode="contain"
          />
        </View>

        {/* ── Stats row ────────────────────────────────────────── */}
        <View style={styles.statsRow}>
          <StatCard label="CLASSIFIED" value={profile.classified_count} color={Colors.eww.green} />
          <StatCard label="MASTERED"   value={profile.mastered_count}   color={Colors.eww.amber} />
          <StatCard label="STREAK"     value={profile.streak_days}      color={Colors.eww.purple} suffix="d" />
          <StatCard label="EVENTS"     value={profile.contamination_count} color={Colors.eww.coral} />
        </View>

        {/* ── Stage ladder ─────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>STAGE LADDER</Text>
          <View style={styles.ladder}>
            {([1, 2, 3, 4, 5] as const).map((s, idx) => {
              const isDone    = currentStage > s;
              const isCurrent = currentStage === s;
              const isLocked  = !profile.is_paid && s > 2;
              return (
                <View key={s}>
                  <View
                    style={[
                      styles.stageRow,
                      isCurrent && styles.stageRowActive,
                      isDone && styles.stageRowDone,
                    ]}
                  >
                    <Image
                      source={STAGE_ICONS[s - 1]}
                      style={[
                        styles.stageRowIcon,
                        isDone && styles.stageRowIconDone,
                      ]}
                      resizeMode="contain"
                    />
                    <View style={styles.stageRowInfo}>
                      <Text
                        style={[
                          styles.stageRowLabel,
                          isCurrent && styles.stageRowLabelActive,
                          isDone && styles.stageRowLabelDone,
                        ]}
                      >
                        STAGE {s}  ·  {STAGE_LABELS[s].toUpperCase()}
                      </Text>
                      {isLocked && !isDone && (
                        <Text style={styles.stageRowLock}>
                          🔒 Full Lab Pass required
                        </Text>
                      )}
                      {isCurrent && (
                        <Text style={styles.stageRowCurrent}>◀ YOU ARE HERE</Text>
                      )}
                      {isDone && (
                        <Text style={styles.stageRowComplete}>✓ COMPLETE</Text>
                      )}
                    </View>
                  </View>
                  {/* Connector between stages (not after last) */}
                  {idx < 4 && (
                    <View style={styles.ladderConnector}>
                      <Image
                        source={Assets.stageLadder}
                        style={styles.ladderConnectorImg}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* ── Streak jar ───────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>STREAK REWARD</Text>
          <View style={styles.streakCard}>
            <Image source={Assets.jarStreak} style={styles.streakJar} resizeMode="contain" />
            <View style={styles.streakInfo}>
              <Text style={styles.streakDays}>{profile.streak_days}</Text>
              <Text style={styles.streakLabel}>DAY{profile.streak_days !== 1 ? 'S' : ''} STREAK</Text>
              <Text style={styles.streakSub}>
                Keep classifying daily to fill the jar and earn bonus scans
              </Text>
            </View>
          </View>
        </View>

        {/* ── Contamination event ──────────────────────────────── */}
        {profile.contamination_count > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>CONTAMINATION EVENTS</Text>
            <View style={styles.contaminationCard}>
              <Image
                source={Assets.bannerSlimeSurge}
                style={styles.contaminationBanner}
                resizeMode="contain"
              />
              <View style={styles.contaminationBody}>
                <Text style={styles.contaminationCount}>
                  {profile.contamination_count}
                </Text>
                <Text style={styles.contaminationLabel}>
                  SLIME SURGE{profile.contamination_count !== 1 ? 'S' : ''} TRIGGERED
                </Text>
                <Text style={styles.contaminationSub}>
                  Get 3 quiz answers in a row to trigger a Slime Surge
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* ── Set cards ────────────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SPECIMEN SETS</Text>
          <TouchableOpacity
            style={styles.setCard}
            onPress={() => router.push('/(tabs)/collection')}
            activeOpacity={0.85}
          >
            <Image source={Assets.set3Cards} style={styles.setCardImg} resizeMode="contain" />
            <View style={styles.setCardInfo}>
              <Text style={styles.setCardTitle}>CREEPY CREATURES</Text>
              <Text style={styles.setCardSub}>
                {profile.classified_count} classified  ·  {profile.mastered_count} mastered
              </Text>
              <Text style={styles.setCardLink}>View collection ›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── Full Lab Pass upsell ─────────────────────────────── */}
        {!profile.is_paid && (
          <TouchableOpacity
            style={styles.passCard}
            onPress={() => router.push('/paywall')}
            activeOpacity={0.88}
          >
            <Image source={Assets.fullLabPass} style={styles.passImg} resizeMode="contain" />
            <View style={styles.passBody}>
              <Text style={styles.passTitle}>FULL LAB PASS</Text>
              <Text style={styles.passSub}>
                Unlock all 3 books, exclusive stages, and bonus facts
              </Text>
              <View style={styles.passBtn}>
                <Text style={styles.passBtnText}>UNLOCK NOW  ›</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  color,
  suffix = '',
}: {
  label: string;
  value: number;
  color: string;
  suffix?: string;
}) {
  return (
    <View style={[styles.statCard, { borderColor: `${color}33` }]}>
      <Text style={[styles.statValue, { color }]}>
        {value}{suffix}
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

// ── Styles ─────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg.DEFAULT },

  titleBlock: {
    alignItems:        'center',
    paddingTop:        10,
    paddingBottom:     8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.subtle,
    marginHorizontal:  Spacing.md,
    marginBottom:      8,
  },
  pageTitle: {
    fontFamily:    FontFamily.creepster,
    fontSize:      28,
    color:         Colors.text.lime,
    letterSpacing: 2,
    textShadowColor:  Colors.eww.greenDark,
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 0,
  },
  pageSub: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.purple,
    letterSpacing: 2.5,
    marginTop:     2,
  },

  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom:     Spacing.xxl,
    gap:               14,
  },

  // ── Identity card ──────────────────────────────────────────────────────────
  identityCard: {
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    borderColor:     Colors.border.DEFAULT,
    padding:         Spacing.md,
    flexDirection:   'row',
    alignItems:      'center',
    justifyContent:  'space-between',
  },
  identityLeft:  { flex: 1, gap: 4 },
  identityLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      10,
    color:         Colors.text.muted,
    letterSpacing: 2.5,
  },
  identityName: {
    fontFamily:    FontFamily.creepster,
    fontSize:      26,
    color:         Colors.text.primary,
    letterSpacing: 1,
  },
  stagePill: {
    alignSelf:       'flex-start',
    backgroundColor: `${Colors.eww.purple}22`,
    borderRadius:    Radius.full,
    borderWidth:     1,
    borderColor:     Colors.border.DEFAULT,
    paddingHorizontal: 10,
    paddingVertical:   4,
    marginTop:         2,
  },
  stagePillText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.purple,
    letterSpacing: 1.2,
  },
  stageIcon: {
    width:  72,
    height: 72,
  },

  // ── Stats row ──────────────────────────────────────────────────────────────
  statsRow: {
    flexDirection: 'row',
    gap:           8,
  },
  statCard: {
    flex:            1,
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.md,
    borderWidth:     1.5,
    padding:         10,
    alignItems:      'center',
    gap:             2,
  },
  statValue: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   24,
    lineHeight: 26,
  },
  statLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.muted,
    letterSpacing: 1,
  },

  // ── Section ────────────────────────────────────────────────────────────────
  section: { gap: 10 },
  sectionTitle: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.muted,
    letterSpacing: 2.5,
  },

  // ── Stage ladder ───────────────────────────────────────────────────────────
  ladder: { gap: 0 },

  stageRow: {
    flexDirection:   'row',
    alignItems:      'center',
    gap:             12,
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.md,
    borderWidth:     1.5,
    borderColor:     Colors.border.subtle,
    padding:         12,
  },
  stageRowActive: {
    borderColor:     Colors.eww.purple,
    backgroundColor: `${Colors.eww.purple}15`,
  },
  stageRowDone: {
    opacity:         0.55,
    borderColor:     Colors.border.subtle,
  },
  stageRowIcon: {
    width:  44,
    height: 44,
  },
  stageRowIconDone: { opacity: 0.6 },
  stageRowInfo:  { flex: 1 },
  stageRowLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      15,
    color:         Colors.text.secondary,
    letterSpacing: 0.5,
  },
  stageRowLabelActive: {
    color: Colors.text.primary,
  },
  stageRowLabelDone: {
    color: Colors.text.muted,
  },
  stageRowLock: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   13,
    color:      Colors.eww.amber,
    marginTop:  2,
  },
  stageRowCurrent: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    color:         Colors.text.purple,
    letterSpacing: 1,
    marginTop:     2,
  },
  stageRowComplete: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    color:         Colors.text.lime,
    letterSpacing: 1,
    marginTop:     2,
  },

  ladderConnector: {
    alignItems: 'center',
    height:     18,
  },
  ladderConnectorImg: {
    width:  20,
    height: 18,
    opacity: 0.6,
  },

  // ── Streak jar ─────────────────────────────────────────────────────────────
  streakCard: {
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    borderColor:     Colors.border.DEFAULT,
    padding:         Spacing.md,
    flexDirection:   'row',
    alignItems:      'center',
    gap:             Spacing.md,
  },
  streakJar: {
    width:  80,
    height: 100,
  },
  streakInfo:  { flex: 1 },
  streakDays: {
    fontFamily:    FontFamily.creepster,
    fontSize:      48,
    color:         Colors.text.lime,
    letterSpacing: 1,
    lineHeight:    50,
  },
  streakLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      15,
    color:         Colors.text.secondary,
    letterSpacing: 1.5,
  },
  streakSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   14,
    color:      Colors.text.muted,
    lineHeight: 20,
    marginTop:  4,
  },

  // ── Contamination ──────────────────────────────────────────────────────────
  contaminationCard: {
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    borderColor:     `${Colors.eww.green}33`,
    overflow:        'hidden',
  },
  contaminationBanner: {
    width:  '100%',
    height: 70,
  },
  contaminationBody: {
    padding: Spacing.md,
    gap:     2,
  },
  contaminationCount: {
    fontFamily:    FontFamily.creepster,
    fontSize:      40,
    color:         Colors.text.lime,
    letterSpacing: 1,
    lineHeight:    42,
  },
  contaminationLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      15,
    color:         Colors.text.secondary,
    letterSpacing: 1.2,
  },
  contaminationSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   14,
    color:      Colors.text.muted,
    marginTop:  4,
    lineHeight: 20,
  },

  // ── Set card ───────────────────────────────────────────────────────────────
  setCard: {
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    borderColor:     Colors.border.subtle,
    padding:         Spacing.md,
    flexDirection:   'row',
    alignItems:      'center',
    gap:             Spacing.md,
  },
  setCardImg: {
    width:  90,
    height: 70,
  },
  setCardInfo:  { flex: 1 },
  setCardTitle: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      16,
    color:         Colors.text.primary,
    letterSpacing: 1,
  },
  setCardSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   14,
    color:      Colors.text.muted,
    marginTop:  4,
  },
  setCardLink: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   14,
    color:      Colors.text.lime,
    marginTop:  6,
  },

  // ── Full Lab Pass ──────────────────────────────────────────────────────────
  passCard: {
    backgroundColor: `${Colors.eww.purple}18`,
    borderRadius:    Radius.lg,
    borderWidth:     2,
    borderColor:     Colors.eww.purple,
    overflow:        'hidden',
    shadowColor:     Colors.eww.purple,
    shadowOffset:    { width: 0, height: 6 },
    shadowOpacity:   0.4,
    shadowRadius:    10,
    elevation:       8,
  },
  passImg: {
    width:  '100%',
    height: 90,
  },
  passBody: {
    padding: Spacing.md,
    gap:     6,
  },
  passTitle: {
    fontFamily:    FontFamily.creepster,
    fontSize:      24,
    color:         Colors.text.primary,
    letterSpacing: 1.5,
  },
  passSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   14,
    color:      Colors.text.secondary,
    lineHeight: 20,
  },
  passBtn: {
    backgroundColor: Colors.eww.purple,
    borderRadius:    Radius.full,
    paddingVertical: 12,
    alignItems:      'center',
    marginTop:       4,
  },
  passBtnText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      18,
    color:         '#fff',
    letterSpacing: 1.5,
  },
});
