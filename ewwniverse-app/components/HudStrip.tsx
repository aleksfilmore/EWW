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
}

function formatCountdown(ms: number): string {
  if (ms <= 0) return 'Ready!';
  const h = Math.floor(ms / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  return `${h}h ${m}m`;
}

export function HudStrip({ scanBalance, scanNextRefresh, streakDays, onRefreshCheck }: Props) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => {
      setNow(Date.now());
      onRefreshCheck();
    }, 30_000); // check every 30s
    return () => clearInterval(id);
  }, [onRefreshCheck]);

  const msUntilRefresh = scanNextRefresh - now;

  return (
    <View style={styles.strip}>
      {/* Scan balance */}
      <View style={styles.cell}>
        <Text style={styles.value}>{scanBalance}</Text>
        <Text style={styles.label}>Scans</Text>
      </View>

      <View style={styles.divider} />

      {/* Next scan timer */}
      <View style={styles.cell}>
        <Text style={[styles.value, msUntilRefresh <= 0 && { color: Colors.eww.green }]}>
          {formatCountdown(msUntilRefresh)}
        </Text>
        <Text style={styles.label}>Next scan</Text>
      </View>

      <View style={styles.divider} />

      {/* Streak */}
      <View style={styles.cell}>
        <Text style={[styles.value, { color: Colors.eww.amber }]}>
          {streakDays}🔥
        </Text>
        <Text style={styles.label}>Day streak</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  strip: {
    flexDirection: 'row',
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: Colors.border.DEFAULT,
    overflow: 'hidden',
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
    color: Colors.text.primary,
  },
  label: {
    fontSize: 10,
    color: Colors.text.muted,
    marginTop: 2,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  divider: {
    width: 1,
    backgroundColor: Colors.border.subtle,
    marginVertical: Spacing.xs,
  },
});
