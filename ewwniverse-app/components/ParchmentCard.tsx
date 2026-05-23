/**
 * ParchmentCard — the aged-paper content card.
 *
 * Matches the website's --color-parchment (#F4EED8) card style.
 * Used for every content panel on a dark lab background.
 */
import { View, StyleSheet, ViewStyle } from 'react-native';
import { Colors, Radius } from '@/constants/design';

interface ParchmentCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  /** Border accent color — defaults to eww green */
  accentColor?: string;
  /** Remove default padding */
  noPadding?: boolean;
}

export function ParchmentCard({
  children,
  style,
  accentColor = Colors.eww.green,
  noPadding = false,
}: ParchmentCardProps) {
  return (
    <View
      style={[
        styles.card,
        { borderColor: accentColor },
        noPadding && { padding: 0 },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.bg.parchment,
    borderRadius: Radius.lg,
    borderWidth: 2.5,
    padding: 14,
    // Layered shadow: dark drop + subtle colour bloom
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 8,
    elevation: 6,
  },
});
