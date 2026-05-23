/**
 * SectionLabel — the bordered section-header pill used throughout the app.
 *
 * Matches the website's small uppercase tracking labels.
 * Usage:
 *   <SectionLabel label="EWW-METER" />
 *   <SectionLabel label="LATEST SPECIMENS" action="SEE ALL" onAction={...} />
 */
import { View, Text, TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Colors, FontFamily, Spacing } from '@/constants/design';

interface SectionLabelProps {
  label: string;
  action?: string;
  onAction?: () => void;
  /** Override container style */
  style?: ViewStyle;
  /** Label on parchment (dark text) or on dark bg (light text) */
  variant?: 'parchment' | 'dark';
}

export function SectionLabel({
  label,
  action,
  onAction,
  style,
  variant = 'parchment',
}: SectionLabelProps) {
  const isDark = variant === 'dark';

  return (
    <View style={[styles.row, style]}>
      <View
        style={[
          styles.pill,
          {
            backgroundColor: isDark
              ? `${Colors.eww.green}22`
              : Colors.eww.forest + '18',
            borderColor: isDark ? Colors.eww.green : Colors.eww.greenDark,
          },
        ]}
      >
        <Text
          style={[
            styles.label,
            { color: isDark ? Colors.eww.green : Colors.eww.forest },
          ]}
        >
          {label}
        </Text>
      </View>

      {action && (
        <TouchableOpacity onPress={onAction} activeOpacity={0.7}>
          <Text style={[styles.action, { color: isDark ? Colors.eww.green : Colors.eww.forest }]}>
            {action} ▶
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  pill: {
    borderWidth: 1.5,
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  label: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 13,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  action: {
    fontFamily: FontFamily.boogaloo,
    fontSize: 12,
    letterSpacing: 0.5,
  },
});
