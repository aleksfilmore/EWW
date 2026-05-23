/**
 * HudStrip — compact horizontal bar showing scan balance + countdown + streak.
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Radius } from '@/constants/design';

interface Props {
  scanBalance: number;
  scanNextRefresh: number;  // unix timestamp ms
  streakDays: number;
  onRefreshCheck: () => void;
  /** false = on parchment card (dark text). Default true = on dark bg (light text) */
  dark?: boolean;
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return 'Ready!';
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return `${h}h ${m}m`;
}

export function HudStrip({ scanBalance, scanNextRefresh, streakDays, onRefreshCheck, dark = true }: Props) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
      onRefreshCheck();
    }, 30_000); // check every 30s
    return () => clearInterval(id);
  }, [onRefreshCheck]);

  const msUntilRefresh = scanNextRefresh - now;

  const valueColor = dark ? Colors.text.primary : Colors.text.onParchment;
  const labelColor = dark ? Colors.text.muted : Colors.text.onParchmentMuted;
  const dividerColor = dark ? Colors.border.subtle : `${Colors.eww.tan}80`;

  return (
    <View style={[styles.strip, dark ? styles.stripDark : styles.stripLight]}>
      {/* Scan balance */}
      <View style={styles.cell}>
        <Text style={[styles.value, { color: valueColor }]}>{scanBalance}</Text>
        <Text style={[styles.label, { color: labelColor }]}>Scans</Text>
      </View>

      <View style={[styles.divider, { backgroundColor: dividerColor }]} />

      {/* Next scan timer */}
      <View style={styles.cell}>
        <Text style={[styles.value, { color: msUntilRefresh <= 0 ? Colors.eww.green : valueColor }]}>
          {formatCountdown(msUntilRefresh)}
        </Text>
        <Text style={[styles.label, { color: labelColor }]}>Next scan</Text>
      </View>

      <View style={[styles.divider, { backgroundColor: dividerColor }]} />

      {/* Streak */}
      <View style={styles.cell}>
        <Text style={[styles.value, { color: Colors.eww.amber }]}>
          {streakDays}🔥
        </Text>
        <Text style={[styles.label, { color: labelColor }]}>Day streak</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: 'row',
    borderRadius: Radius.md,
    overflow: 'hidden',
  },
  stripDark: {
    backgroundColor: Colors.bg.card,
    borderWidth: 1,
    borderColor: Colors.border.DEFAULT,
  },
  stripLight: {
    backgroundColor: 'transparent',
  },
  cell: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.xs,
  },
  value: {
    fontSize: 18,
    fontWeight: '800',
  },
  label: {
    fontSize: 10,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    marginVertical: Spacing.xs,
  },
});
