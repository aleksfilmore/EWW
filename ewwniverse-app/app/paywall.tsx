/**
 * Paywall — Full Lab Pass upgrade screen.
 *
 * €3.99 one-time IAP via RevenueCat.
 *
 * SETUP: add your RevenueCat API keys in services/revenuecat.ts before
 * building for distribution. The purchase button uses a dev-mode mock
 * when keys are not yet configured.
 */
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Colors, FontFamily, Spacing, Radius } from '@/constants/design';
import { Assets } from '@/constants/assets';
import { useUserStore } from '@/store/userStore';
import { PAYWALL_PRICE } from '@/constants/game';
import {
  getDefaultPackage,
  purchaseFullLabPass,
  restorePurchases,
} from '@/services/revenuecat';
import type { PurchasesPackage } from 'react-native-purchases';

const BENEFITS: { icon: string; title: string; sub: string }[] = [
  {
    icon:  '📚',
    title: 'All 3 books — 225 creatures',
    sub:   'Creepy Dinosaurs + Creepy Earth unlock immediately',
  },
  {
    icon:  '⚡',
    title: '2 free scans per 12 hours',
    sub:   'Double the collection speed of the free tier',
  },
  {
    icon:  '🧬',
    title: 'EWW-meter Ranking + Specimen Match',
    sub:   'Two exclusive quiz types locked behind the pass',
  },
  {
    icon:  '🌟',
    title: 'All 5 progression stages',
    sub:   'Stage 3–5 unlocked: Super Slimy → Full Dr. Icky',
  },
  {
    icon:  '☣',
    title: 'Full Special Specimens collection',
    sub:   'All ~30 app-exclusive creatures including Epic rarities',
  },
  {
    icon:  '🔮',
    title: 'Future books included',
    sub:   'Tiny World, Deep Sea, Skeletons — automatically added when shipped',
  },
];

export default function Paywall() {
  const setPaid = useUserStore((s) => s.setPaid);

  const [pkg,       setPkg]       = useState<PurchasesPackage | null>(null);
  const [loading,   setLoading]   = useState(false);
  const [pkgLoaded, setPkgLoaded] = useState(false);

  useEffect(() => {
    getDefaultPackage().then((p) => {
      setPkg(p);
      setPkgLoaded(true);
    });
  }, []);

  const priceLabel = pkg?.product.priceString ?? PAYWALL_PRICE;

  async function handlePurchase() {
    setLoading(true);
    try {
      if (!pkg) {
        // No RevenueCat package loaded — dev-mode mock
        Alert.alert(
          'Dev mode',
          'RevenueCat not configured yet. Purchase simulated.',
          [{ text: 'OK', onPress: () => { setPaid(true); router.back(); } }],
        );
        return;
      }
      const success = await purchaseFullLabPass(pkg);
      if (success) {
        setPaid(true);
        router.back();
      }
    } catch (err: any) {
      // User cancelled — PurchasesErrorCode.PurchaseCancelledError
      if (err?.userCancelled) {
        // Silent — user tapped back
      } else {
        Alert.alert('Purchase failed', err?.message ?? 'Please try again.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRestore() {
    setLoading(true);
    try {
      const entitled = await restorePurchases();
      if (entitled) {
        setPaid(true);
        Alert.alert('Restored!', 'Your Full Lab Pass has been restored.', [
          { text: 'OK', onPress: () => router.back() },
        ]);
      } else {
        Alert.alert(
          'Nothing to restore',
          'No previous Full Lab Pass purchase found on this account.',
        );
      }
    } catch (err: any) {
      Alert.alert('Restore failed', err?.message ?? 'Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <TouchableOpacity
        onPress={() => router.back()}
        style={styles.closeBtn}
        disabled={loading}
      >
        <Text style={styles.closeBtnText}>✕</Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero image */}
        <Image
          source={Assets.fullLabPass}
          style={styles.heroImg}
          resizeMode="contain"
        />

        {/* Headline */}
        <View style={styles.header}>
          <Text style={styles.badge}>☣ FULL LAB PASS ☣</Text>
          <Text style={styles.headline}>Triple your collection.</Text>
          <Text style={styles.headline}>Double your speed.</Text>
          <Text style={styles.sub}>
            One payment. Every book. All future content included automatically.
          </Text>
        </View>

        {/* Price callout */}
        <View style={styles.priceCard}>
          <Text style={styles.price}>{priceLabel}</Text>
          <Text style={styles.priceNote}>one-time · no subscription · no ads</Text>
        </View>

        {/* Benefits */}
        <View style={styles.benefits}>
          {BENEFITS.map((b, i) => (
            <View key={i} style={styles.benefitRow}>
              <Text style={styles.benefitIcon}>{b.icon}</Text>
              <View style={styles.benefitBody}>
                <Text style={styles.benefitTitle}>{b.title}</Text>
                <Text style={styles.benefitSub}>{b.sub}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* CTA */}
        <TouchableOpacity
          style={[styles.purchaseBtn, loading && styles.purchaseBtnLoading]}
          onPress={handlePurchase}
          activeOpacity={0.85}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.purchaseBtnText}>
              Get Full Lab Pass · {priceLabel}
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleRestore}
          style={styles.restoreBtn}
          disabled={loading}
        >
          <Text style={styles.restoreBtnText}>Restore purchase</Text>
        </TouchableOpacity>

        <Text style={styles.legal}>
          Payment charged to your store account at confirmation.{'\n'}
          No subscription. No recurring charges.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Colors.bg.DEFAULT },

  closeBtn: {
    position:        'absolute',
    top:             50,
    right:           Spacing.md,
    zIndex:          10,
    width:           32,
    height:          32,
    borderRadius:    16,
    backgroundColor: Colors.bg.elevated,
    alignItems:      'center',
    justifyContent:  'center',
  },
  closeBtnText: {
    fontSize: 14,
    color:    Colors.text.secondary,
  },

  content: {
    paddingHorizontal: Spacing.md,
    paddingBottom:     Spacing.xl,
    alignItems:        'center',
  },

  heroImg: {
    width:      '100%',
    height:     140,
    marginTop:  Spacing.xl,
    marginBottom: 4,
  },

  header: {
    alignItems:   'center',
    paddingBottom: Spacing.lg,
    gap:           4,
  },
  badge: {
    fontFamily:      FontFamily.boogaloo,
    fontSize:        13,
    color:           Colors.eww.gold,
    letterSpacing:   2,
    backgroundColor: `${Colors.eww.gold}22`,
    paddingHorizontal: 14,
    paddingVertical:   5,
    borderRadius:    Radius.full,
    marginBottom:    Spacing.sm,
  },
  headline: {
    fontFamily:    FontFamily.creepster,
    fontSize:      36,
    color:         Colors.text.primary,
    textAlign:     'center',
    lineHeight:    40,
    letterSpacing: 1,
  },
  sub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   16,
    color:      Colors.text.muted,
    textAlign:  'center',
    marginTop:  Spacing.sm,
    lineHeight: 22,
  },

  priceCard: {
    backgroundColor: `${Colors.eww.green}18`,
    borderWidth:     2,
    borderColor:     Colors.eww.green,
    borderRadius:    Radius.xl,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.xl,
    alignItems:      'center',
    marginBottom:    Spacing.lg,
    width:           '100%',
    shadowColor:     Colors.eww.green,
    shadowOffset:    { width: 0, height: 4 },
    shadowOpacity:   0.25,
    shadowRadius:    8,
    elevation:       4,
  },
  price: {
    fontFamily:    FontFamily.creepster,
    fontSize:      56,
    color:         Colors.eww.green,
    letterSpacing: 1,
    lineHeight:    60,
  },
  priceNote: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   14,
    color:      Colors.text.muted,
    marginTop:  4,
    letterSpacing: 0.5,
  },

  benefits: {
    gap:         8,
    marginBottom: Spacing.lg,
    width:       '100%',
  },
  benefitRow: {
    flexDirection:   'row',
    gap:             Spacing.sm,
    backgroundColor: Colors.bg.card,
    borderRadius:    Radius.md,
    borderWidth:     1,
    borderColor:     Colors.border.subtle,
    padding:         Spacing.md,
    alignItems:      'flex-start',
  },
  benefitIcon:  { fontSize: 22 },
  benefitBody:  { flex: 1, gap: 2 },
  benefitTitle: {
    fontFamily:    FontFamily.boogaloo,
    fontSize:      16,
    color:         Colors.text.primary,
    letterSpacing: 0.2,
  },
  benefitSub: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   13,
    color:      Colors.text.muted,
    lineHeight: 18,
  },

  purchaseBtn: {
    backgroundColor:  Colors.eww.green,
    borderRadius:     Radius.full,
    paddingVertical:  18,
    alignItems:       'center',
    marginBottom:     Spacing.sm,
    width:            '100%',
    shadowColor:      Colors.eww.green,
    shadowOffset:     { width: 0, height: 4 },
    shadowOpacity:    0.4,
    shadowRadius:     12,
    elevation:        8,
  },
  purchaseBtnLoading: { opacity: 0.6 },
  purchaseBtnText: {
    fontFamily:    FontFamily.creepster,
    fontSize:      22,
    color:         '#000',
    letterSpacing: 0.5,
  },

  restoreBtn:     { alignItems: 'center', paddingVertical: 12 },
  restoreBtnText: {
    fontFamily:         FontFamily.boogaloo,
    fontSize:           14,
    color:              Colors.text.muted,
    textDecorationLine: 'underline',
  },

  legal: {
    fontFamily: FontFamily.boogaloo,
    fontSize:   11,
    color:      Colors.text.disabled,
    textAlign:  'center',
    lineHeight: 16,
    paddingHorizontal: Spacing.md,
    marginTop:  Spacing.sm,
  },
});
