/**
 * Central require() map for all illustrated assets.
 * Import from here so Metro resolves every path statically.
 */

export const Assets = {
  // ── Header / global ──────────────────────────────────────────
  logoMain:       require('../assets/logo-main.png'),
  logoHeader:     require('../assets/logo-header.png'),
  badgeScans:     require('../assets/badge-scans.png'),
  badgeStreak:    require('../assets/badge-streak.png'),
  slimeDrip:      require('../assets/slime-drip.png'),

  // ── Jars ─────────────────────────────────────────────────────
  jarMystery:     require('../assets/jar-mystery.png'),
  jarClassified:  require('../assets/jar-classified.png'),
  jarLockedFrame: require('../assets/jar-locked-frame.png'),
  jarLocked:      require('../assets/jar-locked.png'),
  jarLarge:       require('../assets/jar-large.png'),
  jarStreak:      require('../assets/jar-streak.png'),

  // ── Overlays / stamps ────────────────────────────────────────
  classifiedStamp: require('../assets/classified-stamp.png'),
  ewwMeterBar:    require('../assets/eww-meter-bar.png'),
  tagRare:        require('../assets/tag-rare.png'),
  tagFlask:       require('../assets/tag-flask.png'),
  tagSkull:       require('../assets/tag-skull.png'),
  tagClassified:  require('../assets/tag-classified.png'),

  // ── Book tab icons ───────────────────────────────────────────
  tabCreatures:   require('../assets/tab-creatures.png'),
  tabDinosaurs:   require('../assets/tab-dinosaurs.png'),
  tabEarth:       require('../assets/tab-earth.png'),
  tabSpecial:     require('../assets/tab-special.png'),

  // ── Stage icons ──────────────────────────────────────────────
  stage1:         require('../assets/stage-1.png'),
  stage2:         require('../assets/stage-2.png'),
  stage3:         require('../assets/stage-3.png'),
  stage4:         require('../assets/stage-4.png'),
  stage5:         require('../assets/stage-5.png'),
  stageLadder:    require('../assets/stage-ladder.png'),

  // ── Creature detail buttons ───────────────────────────────────
  btnMaster:      require('../assets/btn-master.png'),
  btnHearDrIcky:  require('../assets/btn-hear-dricky.png'),
  btnAddToSet:    require('../assets/btn-add-to-set.png'),

  // ── Creature detail icons ─────────────────────────────────────
  iconRadar:      require('../assets/icon-radar.png'),
  iconLock:       require('../assets/icon-lock.png'),

  // ── Mission icons ─────────────────────────────────────────────
  missionScan:    require('../assets/mission-scan.png'),
  missionWarning: require('../assets/mission-warning.png'),
  missionRare:    require('../assets/mission-rare.png'),

  // ── Quiz ─────────────────────────────────────────────────────
  badgeLabQuiz:   require('../assets/badge-lab-quiz.png'),
  quizIconFact:   require('../assets/quiz-icon-fact.png'),
  quizIconRanking:require('../assets/quiz-icon-ranking.png'),
  quizIconMatch:  require('../assets/quiz-icon-match.png'),
  btnSubmitAnswer:require('../assets/btn-submit-answer.png'),

  // ── Rewards ───────────────────────────────────────────────────
  bannerSlimeSurge: require('../assets/banner-slime-surge.png'),
  iconSlimeCoin:  require('../assets/icon-slime-coin.png'),
  setCard:        require('../assets/set-card.png'),
  set3Cards:      require('../assets/set-3cards.png'),
  fullLabPass:    require('../assets/full-lab-pass.png'),

  // ── Nav tab icons (existing) ──────────────────────────────────
  tabHome:        require('../assets/tab-home.png'),
  tabExplore:     require('../assets/tab-explore.png'),
  tabRewards:     require('../assets/tab-rewards.png'),

  // ── Dr. Icky illustrations ────────────────────────────────────
  drIckyPortrait:    require('../assets/dr-icky-portrait.png'),
  drIckyJar:         require('../assets/dr-icky-jar.png'),
  drIckyCelebrating: require('../assets/dr-icky-celebrating.png'),
  drIckyWarning:     require('../assets/dr-icky-warning.png'),
} as const;
