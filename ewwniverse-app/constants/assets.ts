/**
 * Central require() map for all illustrated assets.
 * Import from here so Metro resolves every path statically.
 */

export const Assets = {
  // ── Header / global ──────────────────────────────────────────
  logoMain:       require('../assets/logo-main.png'),

  // ── Jars ─────────────────────────────────────────────────────
  jarMystery:     require('../assets/jar-mystery.png'),
  jarClassified:  require('../assets/jar-classified.png'),
  jarLockedFrame: require('../assets/jar-locked-frame.png'),
  jarLarge:       require('../assets/jar-large.png'),
  jarStreak:      require('../assets/jar-streak.png'),

  // ── Overlays / stamps ────────────────────────────────────────
  classifiedStamp: require('../assets/classified-stamp.png'),

  // ── Book tab icons ───────────────────────────────────────────
  tabCreatures:   require('../assets/tab-creatures.png'),
  tabDinosaurs:   require('../assets/tab-dinosaurs.png'),
  tabEarth:       require('../assets/tab-earth.png'),

  // ── Stage icons ──────────────────────────────────────────────
  stage1:         require('../assets/stage-1.png'),
  stage2:         require('../assets/stage-2.png'),
  stage3:         require('../assets/stage-3.png'),
  stage4:         require('../assets/stage-4.png'),
  stage5:         require('../assets/stage-5.png'),

  // ── Creature detail buttons ───────────────────────────────────
  btnMaster:      require('../assets/btn-master.png'),
  btnHearDrIcky:  require('../assets/btn-hear-dricky.png'),

  // ── Creature detail icons ─────────────────────────────────────
  iconRadar:      require('../assets/icon-radar.png'),
  iconLock:       require('../assets/icon-lock.png'),

  // ── Mission icons ─────────────────────────────────────────────
  missionScan:    require('../assets/mission-scan.png'),
  missionWarning: require('../assets/mission-warning.png'),
  missionRare:    require('../assets/mission-rare.png'),

  // ── Quiz ─────────────────────────────────────────────────────
  btnSubmitAnswer:require('../assets/btn-submit-answer.png'),

  // ── Rewards ───────────────────────────────────────────────────
  bannerSlimeSurge: require('../assets/banner-slime-surge.png'),
  iconSlimeCoin:  require('../assets/icon-slime-coin.png'),
  fullLabPass:    require('../assets/full-lab-pass.png'),

  // ── Dr. Icky illustrations ────────────────────────────────────
  drIckyPortrait:    require('../assets/dr-icky-portrait.png'),
  drIckyJar:         require('../assets/dr-icky-jar.png'),
  drIckyCelebrating: require('../assets/dr-icky-celebrating.png'),
  drIckyWarning:     require('../assets/dr-icky-warning.png'),

  // ── Book covers ───────────────────────────────────────────────
  bookCoverCreatures:  require('../assets/book-cover-creatures.png'),
  bookCoverDinosaurs:  require('../assets/book-cover-dinosaurs.png'),
  bookCoverEarth:      require('../assets/book-cover-earth.png'),
} as const;
