/**
 * RECRUIT FILE — Rewards & Stage Progression
 *
 * Layout (reorganised):
 *   AppHeader → SPECIAL SPECIMENS (hero) → Stats row
 *   → Stage ladder (horizontal, coloured) → Streak jar
 *   → Slime Surge events → Specimen sets → Full Lab Pass upsell
 *
 * Changes from v1:
 *   - SPECIAL SPECIMENS moved to top as main attraction
 *   - RECRUIT identity badge removed (same for all users)
 *   - Stage ladder is now horizontal with per-stage colours
 *   - Slime Surge: larger illustration, text centred below
 *   - Full Lab Pass card: image left, text right, updated copy
 *   - Font sizes increased throughout for kids
 */
import { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { useUserStore } from '@/store/userStore';
import { useGameStore } from '@/store/gameStore';
import { STAGE_LABELS } from '@/constants/game';
import { AppHeader } from '@/components/AppHeader';
import { SPECIAL_SPECIMENS, SpecialSpecimen } from '@/data/special-specimens';
import { CREATURE_IMAGES } from '@/constants/creatureImages';

const { width: SCREEN_W } = Dimensions.get('window');

// Explicit jar dimensions — no absoluteFill on Android
const SPECIAL_JAR_W = 64;
const SPECIAL_JAR_H = 74;
const SPECIAL_CREATURE_W = 38;
const SPECIAL_CREATURE_H = 38;

const STAGE_ICONS = [
  Assets.stage1,
  Assets.stage2,
  Assets.stage3,
  Assets.stage4,
  Assets.stage5,
] as const;

// Per-stage accent colour
const STAGE_COLORS = [
  Colors.eww.green,   // 1
  Colors.eww.amber,   // 2
  Colors.eww.purple,  // 3
  Colors.eww.coral,   // 4
  Colors.eww.gold,    // 5
];

export default function Rewards() {
  const profile                  = useUserStore((s) => s.profile);
  const triggerDrIckyForSpecimen = useGameStore((s) => s.triggerDrIckyForSpecimen);
  const drIckySource             = useGameStore((s) => s.drIckySource);
  const [selectedSpecimen, setSelectedSpecimen] = useState<SpecialSpecimen | null>(null);
  const [pendingSpecimen,  setPendingSpecimen]  = useState<SpecialSpecimen | null>(null);

  // When Dr. Icky video finishes (source clears), open the queued specimen modal
  useEffect(() => {
    if (drIckySource === null && pendingSpecimen !== null) {
      setSelectedSpecimen(pendingSpecimen);
      setPendingSpecimen(null);
    }
  }, [drIckySource, pendingSpecimen]);

  if (!profile) return null;

  const handleSelectSpecimen = (s: SpecialSpecimen) => {
    triggerDrIckyForSpecimen(s.id);
    // If no video is available for this specimen, open modal immediately
    if (useGameStore.getState().drIckySource === null) {
      setSelectedSpecimen(s);
    } else {
      setPendingSpecimen(s);
    }
  };

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
        {/* ── 1. SPECIAL SPECIMENS (hero section) ──────────── */}
        <SpecialSpecimensSection
          ownedIds={Object.keys(profile.special_specimens)}
          onSelectSpecimen={handleSelectSpecimen}
        />

        {/* ── 2. Stats row ─────────────────────────────────── */}
        <View style={styles.statsRow}>
          <StatCard label="CLASSIFIED" value={profile.classified_count} color={Colors.eww.green} />
          <StatCard label="MASTERED"   value={profile.mastered_count}   color={Colors.eww.amber} />
          <StatCard label="STREAK"     value={profile.streak_days}      color={Colors.eww.purple} suffix="d" />
          <StatCard label="EVENTS"     value={profile.contamination_count} color={Colors.eww.coral} />
        </View>

        {/* ── 3. Stage ladder (horizontal) ─────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>STAGE LADDER</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.hLadder}
          >
            {([1, 2, 3, 4, 5] as const).map((s, idx) => {
              const isDone    = currentStage > s;
              const isCurrent = currentStage === s;
              const isLocked  = !profile.is_paid && s > 2;
              const color     = STAGE_COLORS[idx];
              return (
                <View key={s} style={styles.hLadderItem}>
                  <View
                    style={[
                      styles.hStageCard,
                      { borderColor: isCurrent ? color : `${color}44` },
                      isCurrent && { backgroundColor: `${color}22` },
                      isDone    && { opacity: 0.55 },
                    ]}
                  >
                    <Image
                      source={STAGE_ICONS[s - 1]}
                      style={styles.hStageIcon}
                      resizeMode="contain"
                    />
                    <Text style={[styles.hStageNum, { color }]}>
                      {s}
                    </Text>
                    <Text style={styles.hStageLabel} numberOfLines={2}>
                      {STAGE_LABELS[s].toUpperCase()}
                    </Text>
                    {isCurrent && (
                      <View style={[styles.hStageActive, { backgroundColor: color }]}>
                        <Text style={styles.hStageActiveText}>YOU</Text>
                      </View>
                    )}
                    {isDone && (
                      <Text style={[styles.hStageDone, { color }]}>✓</Text>
                    )}
                    {isLocked && !isDone && (
                      <Text style={styles.hStageLock}>🔒</Text>
                    )}
                  </View>
                  {/* Arrow connector */}
                  {idx < 4 && (
                    <Text style={styles.hLadderArrow}>›</Text>
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>

        {/* ── 4. Streak jar ────────────────────────────────── */}
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

        {/* ── 5. Slime Surge events ─────────────────────────── */}
        {profile.contamination_count > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>SLIME SURGES</Text>
            <View style={styles.contaminationCard}>
              <Image
                source={Assets.bannerSlimeSurge}
                style={styles.contaminationBanner}
                resizeMode="contain"
              />
              <Text style={styles.contaminationCount}>
                {profile.contamination_count}
              </Text>
              <Text style={styles.contaminationLabel}>
                SLIME SURGE{profile.contamination_count !== 1 ? 'S' : ''} TRIGGERED
              </Text>
              <Text style={styles.contaminationSub}>
                Master specimens to trigger Slime Surges and unlock special specimens
              </Text>
            </View>
          </View>
        )}

        {/* ── 6. Set cards ──────────────────────────────────── */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>SPECIMEN SETS</Text>
          <TouchableOpacity
            style={styles.setCard}
            onPress={() => router.push('/(tabs)/collection')}
            activeOpacity={0.85}
          >
            <Image source={Assets.jarClassified} style={styles.setCardImg} resizeMode="contain" />
            <View style={styles.setCardInfo}>
              <Text style={styles.setCardTitle}>CREEPY CREATURES</Text>
              <Text style={styles.setCardSub}>
                {profile.classified_count} classified  ·  {profile.mastered_count} mastered
              </Text>
              <Text style={styles.setCardLink}>View collection ›</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* ── 7. Full Lab Pass upsell ───────────────────────── */}
        {!profile.is_paid && (
          <TouchableOpacity
            style={styles.passCard}
            onPress={() => router.push('/paywall')}
            activeOpacity={0.88}
          >
            <Image source={Assets.fullLabPass} style={styles.passImg} resizeMode="contain" />
            <View style={styles.passBody}>
              <Text style={styles.passTitle}>GET THE FULL PASS</Text>
              <Text style={styles.passSub}>
                Unlock all specimens, no ads, no subscription — one time fee for lifetime access.
              </Text>
              <View style={styles.passBtn}>
                <Text style={styles.passBtnText}>UNLOCK NOW  ›</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* ── Special Specimen detail modal ───────────────────────── */}
      <Modal
        visible={selectedSpecimen !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedSpecimen(null)}
      >
        {selectedSpecimen && (
          <SpecimenDetailSheet
            specimen={selectedSpecimen}
            onClose={() => setSelectedSpecimen(null)}
          />
        )}
      </Modal>
    </SafeAreaView>
  );
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function SpecimenDetailSheet({
  specimen,
  onClose,
}: {
  specimen: SpecialSpecimen;
  onClose: () => void;
}) {
  const creatureImg = CREATURE_IMAGES[specimen.id];
  const IMG_SIZE    = SCREEN_W - 80;

  const meterColor =
    specimen.eww_meter === 100 ? Colors.eww.coral :
    specimen.eww_meter === 80  ? Colors.eww.amber :
    Colors.eww.green;

  return (
    <View style={styles.sheetBackdrop}>
      <View style={styles.sheetContainer}>
        {/* Close button */}
        <TouchableOpacity style={styles.sheetClose} onPress={onClose}>
          <Text style={styles.sheetCloseText}>✕</Text>
        </TouchableOpacity>

        {/* Special badge */}
        <View style={styles.sheetSpecialBadge}>
          <Text style={styles.sheetSpecialBadgeText}>☣  SPECIAL SPECIMEN</Text>
        </View>

        {/* Creature image */}
        {creatureImg ? (
          <Image
            source={creatureImg}
            style={{ width: IMG_SIZE, height: IMG_SIZE, borderRadius: Radius.lg }}
            resizeMode="cover"
          />
        ) : null}

        {/* Name */}
        <Text style={styles.sheetName}>{specimen.title.toUpperCase()}</Text>

        {/* Realm */}
        <Text style={styles.sheetRealm}>{specimen.realm.toUpperCase()}</Text>

        {/* EWW meter */}
        <View style={[
          styles.sheetMeter,
          { backgroundColor: `${meterColor}22`, borderColor: `${meterColor}55` },
        ]}>
          <Text style={[styles.sheetMeterText, { color: meterColor }]}>
            EWW METER  {specimen.eww_meter}
          </Text>
        </View>

        {/* Gross fact */}
        <Text style={styles.sheetFact}>{specimen.gross_fact}</Text>
      </View>
    </View>
  );
}

function SpecialSpecimensSection({
  ownedIds,
  onSelectSpecimen,
}: {
  ownedIds: string[];
  onSelectSpecimen: (s: SpecialSpecimen) => void;
}) {
  const owned    = new Set(ownedIds);
  const unlocked = SPECIAL_SPECIMENS.filter((s) => owned.has(s.id));
  const total    = SPECIAL_SPECIMENS.length;

  const ewwBadgeColor = (meter: 60 | 80 | 100) => {
    if (meter === 100) return Colors.eww.coral;
    if (meter === 80)  return Colors.eww.amber;
    return Colors.eww.green;
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeaderRow}>
        <Text style={[styles.sectionTitle, styles.sectionTitleHero]}>
          ☣ SPECIAL SPECIMENS
        </Text>
        <Text style={styles.sectionCount}>
          {unlocked.length} / {total}
        </Text>
      </View>

      {unlocked.length > 0 && (
        <Text style={styles.specialHint}>Tap a specimen to watch Dr. Icky ▶</Text>
      )}

      {unlocked.length === 0 ? (
        <View style={styles.specialEmpty}>
          <Text style={styles.specialEmptyIcon}>☣</Text>
          <Text style={styles.specialEmptyText}>
            Master your first specimen to trigger a{'\n'}Slime Surge and unlock a special specimen!
          </Text>
        </View>
      ) : (
        <View style={styles.specialGrid}>
          {unlocked.map((s) => {
            const creatureImg = CREATURE_IMAGES[s.id];
            const meterColor  = ewwBadgeColor(s.eww_meter);
            return (
              <TouchableOpacity
                key={s.id}
                style={styles.specialCard}
                onPress={() => onSelectSpecimen(s)}
                activeOpacity={0.8}
              >
                {/* Jar with creature image — explicit pixel dimensions, no absoluteFill */}
                <View style={styles.specialJarWrap}>
                  <Image
                    source={Assets.jarClassified}
                    style={{ width: SPECIAL_JAR_W, height: SPECIAL_JAR_H }}
                    resizeMode="contain"
                  />
                  {creatureImg ? (
                    <Image
                      source={creatureImg}
                      style={{
                        position:     'absolute',
                        width:        SPECIAL_CREATURE_W,
                        height:       SPECIAL_CREATURE_H,
                        top:          Math.round(SPECIAL_JAR_H * 0.30),
                        borderRadius: 4,
                      }}
                      resizeMode="cover"
                    />
                  ) : (
                    <Text style={styles.specialJarIcon}>☣</Text>
                  )}
                </View>
                <Text style={styles.specialName} numberOfLines={2}>
                  {s.title.toUpperCase()}
                </Text>
                <View style={[
                  styles.specialMeter,
                  { backgroundColor: `${meterColor}22`, borderColor: `${meterColor}55` },
                ]}>
                  <Text style={[styles.specialMeterText, { color: meterColor }]}>
                    EWW {s.eww_meter}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          {/* Locked placeholders for unowned — show up to 4 */}
          {SPECIAL_SPECIMENS.filter((s) => !owned.has(s.id)).slice(0, 4).map((s) => (
            <View key={s.id} style={[styles.specialCard, styles.specialCardLocked]}>
              <View style={styles.specialJarWrap}>
                <Image
                  source={Assets.jarMystery}
                  style={{ width: SPECIAL_JAR_W, height: SPECIAL_JAR_H }}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.specialNameLocked}>???</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

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
    fontFamily:       FontFamily.creepster,
    fontSize:         28,
    color:            Colors.text.lime,
    letterSpacing:    2,
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
    fontSize:   26,
    lineHeight: 28,
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
    fontSize:      12,
    color:         Colors.text.muted,
    letterSpacing: 2.5,
  },
  sectionTitleHero: {
    fontSize:  16,
    color:     Colors.text.lime,
    letterSpacing: 2,
  },

  // ── Horizontal stage ladder ─────────────────────────────────────────────────
  hLadder: {
    flexDirection: 'row',
    alignItems:    'center',
    gap:           0,
    paddingVertical: 4,
  },
  hLadderItem: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  hStageCard: {
    width:           72,
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.md,
    borderWidth:     2,
    padding:         8,
    alignItems:      'center',
    gap:             4,
  },
  hStageIcon: {
    width:  38,
    height: 38,
  },
  hStageNum: {
    fontFamily:    FontFamily.creepster,
    fontSize:      22,
    lineHeight:    22,
    letterSpacing: 0,
  },
  hStageLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      10,
    color:         Colors.text.secondary,
    textAlign:     'center',
    letterSpacing: 0.3,
    lineHeight:    13,
  },
  hStageActive: {
    borderRadius:      Radius.full,
    paddingHorizontal: 6,
    paddingVertical:   2,
    marginTop:         2,
  },
  hStageActiveText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      10,
    color:         '#000',
    letterSpacing: 0.5,
    fontWeight:    '700',
  },
  hStageDone: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   14,
    marginTop:  2,
  },
  hStageLock: {
    fontSize:  12,
    marginTop: 2,
  },
  hLadderArrow: {
    fontFamily:    FontFamily.creepster,
    fontSize:      22,
    color:         Colors.text.muted,
    paddingHorizontal: 2,
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
    fontSize:      52,
    color:         Colors.text.lime,
    letterSpacing: 1,
    lineHeight:    54,
  },
  streakLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      17,
    color:         Colors.text.secondary,
    letterSpacing: 1.5,
  },
  streakSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   15,
    color:      Colors.text.muted,
    lineHeight: 21,
    marginTop:  4,
  },

  // ── Contamination (Slime Surge) ────────────────────────────────────────────
  contaminationCard: {
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    borderColor:     `${Colors.eww.green}33`,
    overflow:        'hidden',
    alignItems:      'center',
    paddingBottom:   Spacing.md,
    gap:             4,
  },
  contaminationBanner: {
    width:  '100%',
    height: 110,
  },
  contaminationCount: {
    fontFamily:    FontFamily.creepster,
    fontSize:      56,
    color:         Colors.text.lime,
    letterSpacing: 1,
    lineHeight:    58,
    textAlign:     'center',
  },
  contaminationLabel: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      17,
    color:         Colors.text.secondary,
    letterSpacing: 1.2,
    textAlign:     'center',
  },
  contaminationSub: {
    fontFamily:        FontFamily.boogaloo,
    fontSize:          15,
    color:             Colors.text.muted,
    textAlign:         'center',
    lineHeight:        21,
    paddingHorizontal: Spacing.md,
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
    width:  64,
    height: 80,
  },
  setCardInfo:  { flex: 1 },
  setCardTitle: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      18,
    color:         Colors.text.primary,
    letterSpacing: 1,
  },
  setCardSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   15,
    color:      Colors.text.muted,
    marginTop:  4,
  },
  setCardLink: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   15,
    color:      Colors.text.lime,
    marginTop:  6,
  },

  // ── Full Lab Pass (horizontal layout) ──────────────────────────────────────
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
    flexDirection:   'row',
    alignItems:      'center',
    padding:         Spacing.md,
    gap:             Spacing.md,
  },
  passImg: {
    width:  90,
    height: 120,
    flexShrink: 0,
  },
  passBody: {
    flex: 1,
    gap:  8,
  },
  passTitle: {
    fontFamily:    FontFamily.creepster,
    fontSize:      22,
    color:         Colors.text.primary,
    letterSpacing: 1,
    lineHeight:    24,
  },
  passSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   15,
    color:      Colors.text.secondary,
    lineHeight: 21,
  },
  passBtn: {
    backgroundColor: Colors.eww.purple,
    borderRadius:    Radius.full,
    paddingVertical:   10,
    paddingHorizontal: 14,
    alignItems:        'center',
    alignSelf:         'flex-start',
  },
  passBtnText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      16,
    color:         '#fff',
    letterSpacing: 1,
  },

  // ── Special Specimens ──────────────────────────────────────────────────────
  sectionHeaderRow: {
    flexDirection:  'row',
    alignItems:     'center',
    justifyContent: 'space-between',
  },
  sectionCount: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      14,
    color:         Colors.text.muted,
    letterSpacing: 0.5,
  },
  specialHint: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      15,
    color:         Colors.eww.green,
    letterSpacing: 0.3,
    opacity:       0.8,
    marginTop:     -4,
  },
  specialEmpty: {
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.lg,
    borderWidth:     1.5,
    borderColor:     `${Colors.eww.green}30`,
    borderStyle:     'dashed',
    padding:         Spacing.lg,
    alignItems:      'center',
    gap:             10,
  },
  specialEmptyIcon: {
    fontSize: 36,
    color:    `${Colors.eww.green}60`,
  },
  specialEmptyText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   17,
    color:      Colors.text.muted,
    textAlign:  'center',
    lineHeight: 24,
  },
  specialGrid: {
    flexDirection: 'row',
    flexWrap:      'wrap',
    gap:           8,
  },
  specialCard: {
    width:           (SCREEN_W - Spacing.md * 2 - 8 * 3) / 4,
    alignItems:      'center',
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.md,
    borderWidth:     1.5,
    borderColor:     `${Colors.eww.green}40`,
    padding:         6,
    gap:             4,
  },
  specialCardLocked: {
    borderColor: Colors.border.subtle,
    opacity:     0.5,
  },
  specialJarWrap: {
    width:          SPECIAL_JAR_W,
    height:         SPECIAL_JAR_H,
    alignItems:     'center',
    justifyContent: 'center',
  },
  specialJarIcon: {
    fontSize: 22,
    color:    Colors.eww.green,
    position: 'absolute',
    top:      '28%',
  },
  specialName: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      11,
    color:         Colors.text.secondary,
    textAlign:     'center',
    lineHeight:    14,
    letterSpacing: 0.3,
  },
  specialNameLocked: {
    fontFamily: FontFamily.creepster,
    fontSize:   14,
    color:      Colors.text.muted,
    textAlign:  'center',
  },
  specialMeter: {
    borderRadius:      Radius.full,
    paddingHorizontal: 5,
    paddingVertical:   2,
    borderWidth:       1,
  },
  specialMeterText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      10,
    letterSpacing: 0.3,
  },

  // ── Specimen detail bottom sheet ───────────────────────────────────────────
  sheetBackdrop: {
    flex:            1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent:  'flex-end',
  },
  sheetContainer: {
    backgroundColor:      Colors.bg.card,
    borderTopLeftRadius:  Radius.xl,
    borderTopRightRadius: Radius.xl,
    borderWidth:          1.5,
    borderColor:          Colors.border.DEFAULT,
    padding:              Spacing.lg,
    paddingBottom:        44,
    gap:                  12,
    alignItems:           'center',
  },
  sheetClose: {
    alignSelf:      'flex-end',
    width:          32,
    height:         32,
    alignItems:     'center',
    justifyContent: 'center',
  },
  sheetCloseText: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   20,
    color:      Colors.text.muted,
  },
  sheetSpecialBadge: {
    backgroundColor:   `${Colors.eww.green}22`,
    borderRadius:      Radius.full,
    paddingHorizontal: 14,
    paddingVertical:   5,
    borderWidth:       1,
    borderColor:       `${Colors.eww.green}55`,
  },
  sheetSpecialBadgeText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      12,
    color:         Colors.text.lime,
    letterSpacing: 1.5,
  },
  sheetName: {
    fontFamily:    FontFamily.creepster,
    fontSize:      26,
    color:         Colors.text.primary,
    letterSpacing: 1,
    textAlign:     'center',
  },
  sheetRealm: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      13,
    color:         Colors.text.muted,
    letterSpacing: 2,
    textAlign:     'center',
  },
  sheetMeter: {
    borderRadius:      Radius.full,
    paddingHorizontal: 14,
    paddingVertical:   6,
    borderWidth:       1.5,
  },
  sheetMeterText: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      15,
    letterSpacing: 0.5,
  },
  sheetFact: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   17,
    color:      Colors.text.secondary,
    lineHeight: 24,
    textAlign:  'center',
  },
});
