/**
 * Paywall — Full Lab Pass upgrade screen.
 * €3.99 one-time IAP. RevenueCat integration pending.
 */
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, Spacing, Radius } from '@/constants/design';
import { useUserStore } from '@/store/userStore';
import { PAYWALL_PRICE } from '@/constants/game';

const BENEFITS = [
  { icon: '📚', text: 'All 3 books — 225 creatures total (Dinos + Earth)' },
  { icon: '⚡', text: '2 free scans per 12 hours (double the speed)' },
  { icon: '🎯', text: 'EWW-meter Ranking + Specimen Match quizzes' },
  { icon: '🧬', text: 'All 5 progression stages unlocked' },
  { icon: '🌟', text: 'Full Special Specimens collection (~30 exclusives)' },
  { icon: '🔮', text: 'Future books added automatically when shipped' },
];

export default function Paywall() {
  const setPaid = useUserStore((s) => s.setPaid);

  function handlePurchase() {
    // TODO: RevenueCat purchase flow
    // For now: simulate purchase for development
    setPaid(true);
    router.back();
  }

  function handleRestore() {
    // TODO: RevenueCat restore flow
    router.back();
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <TouchableOpacity onPress={() => router.back()} style={styles.closeBtn}>
        <Text style={styles.closeBtnText}>✕</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.badge}>FULL LAB PASS</Text>
          <Text style={styles.headline}>Triple your collection.</Text>
          <Text style={styles.headline}>Double your speed.</Text>
          <Text style={styles.sub}>
            One payment. Every book. All future content included.
          </Text>
        </View>

        {/* Price */}
        <View style={styles.priceCard}>
          <Text style={styles.price}>{PAYWALL_PRICE}</Text>
          <Text style={styles.priceNote}>one-time · no subscription · no ads</Text>
        </View>

        {/* Benefits */}
        <View style={styles.benefits}>
          {BENEFITS.map((b, i) => (
            <View key={i} style={styles.benefitRow}>
              <Text style={styles.benefitIcon}>{b.icon}</Text>
              <Text style={styles.benefitText}>{b.text}</Text>
            </View>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={styles.purchaseBtn}
          onPress={handlePurchase}
          activeOpacity={0.85}
        >
          <Text style={styles.purchaseBtnText}>
            Get Full Lab Pass · {PAYWALL_PRICE}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleRestore} style={styles.restoreBtn}>
          <Text style={styles.restoreBtnText}>Restore purchase</Text>
        </TouchableOpacity>

        <Text style={styles.legal}>
          Payment charged to Google Play account at confirmation. No subscription.
          No recurring charges.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg.surface },
  closeBtn: {
    position: 'absolute',
    top: 50,
    right: Spacing.md,
    zIndex: 10,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.bg.elevated,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeBtnText: { fontSize: 14, color: Colors.text.secondary },

  content: { paddingHorizontal: Spacing.md, paddingBottom: Spacing.xl },

  header: {
    paddingTop: Spacing.xl * 2,
    paddingBottom: Spacing.lg,
    alignItems: 'center',
  },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.eww.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
    backgroundColor: `${Colors.eww.gold}22`,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: Radius.full,
    marginBottom: Spacing.md,
  },
  headline: {
    fontSize: 32,
    fontWeight: '900',
    color: Colors.text.primary,
    textAlign: 'center',
    lineHeight: 38,
  },
  sub: {
    fontSize: 15,
    color: Colors.text.muted,
    textAlign: 'center',
    marginTop: Spacing.sm,
    lineHeight: 22,
  },

  priceCard: {
    backgroundColor: `${Colors.eww.green}18`,
    borderWidth: 2,
    borderColor: Colors.eww.green,
    borderRadius: Radius.xl,
    padding: Spacing.lg,
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  price: {
    fontSize: 48,
    fontWeight: '900',
    color: Colors.eww.greenLight,
  },
  priceNote: {
    fontSize: 12,
    color: Colors.text.muted,
    marginTop: 4,
  },

  benefits: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  benefitRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    backgroundColor: Colors.bg.card,
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'flex-start',
  },
  benefitIcon: { fontSize: 20 },
  benefitText: {
    flex: 1,
    fontSize: 14,
    color: Colors.text.secondary,
    lineHeight: 20,
  },

  purchaseBtn: {
    backgroundColor: Colors.eww.green,
    borderRadius: Radius.full,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: Spacing.sm,
    shadowColor: Colors.eww.green,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  purchaseBtnText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#000',
    letterSpacing: 0.5,
  },

  restoreBtn: { alignItems: 'center', paddingVertical: 12 },
  restoreBtnText: {
    fontSize: 13,
    color: Colors.text.muted,
    textDecorationLine: 'underline',
  },
  legal: {
    fontSize: 10,
    color: Colors.text.disabled,
    textAlign: 'center',
    lineHeight: 16,
    paddingHorizontal: Spacing.md,
    marginTop: Spacing.sm,
  },
});
