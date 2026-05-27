/**
 * RevenueCat service — react-native-purchases v10 + react-native-purchases-ui
 *
 * Product:     lifetime  (one-time, non-consumable)
 * Entitlement: full_lab_pass  (display name "EWW-niverse Pro" in RC dashboard)
 * Offering:    default
 *
 * Dashboard: https://app.revenuecat.com/projects
 *
 * ── Architecture note ────────────────────────────────────────────────────────
 * This is a React Native / Expo app. The RevenueCat Android SDK
 * (com.revenuecat.purchases:purchases) is auto-linked by the
 * react-native-purchases npm package — no manual Gradle entry is needed.
 * react-native-purchases-ui adds the Paywall + Customer Center UI layer.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import Purchases, {
  LOG_LEVEL,
  PurchasesPackage,
  CustomerInfo,
} from 'react-native-purchases';
import RevenueCatUI, { PAYWALL_RESULT } from 'react-native-purchases-ui';
import { Platform } from 'react-native';
import { REVENUECAT_ENTITLEMENT } from '@/constants/game';

// ─── API Keys ──────────────────────────────────────────────────────────────────
// Found in: RevenueCat Dashboard → Project → Apps → [your app] → API Keys
// Use the PUBLIC (SDK) key — never the secret key.
const REVENUECAT_API_KEY_ANDROID = 'goog_ODdbXORqxqegrYMYPbMvlSkicau';
const REVENUECAT_API_KEY_IOS     = 'appl_BSnfsKcpIUxnRnYaBfGscSOwvhJ';
// ──────────────────────────────────────────────────────────────────────────────

let _initialized = false;

// ─── Initialization ────────────────────────────────────────────────────────────

/**
 * Call once on app start (AppBootstrap in _layout.tsx).
 * Safe to call multiple times — no-ops after first successful init.
 *
 * @param userId  Firebase UID (or any stable anonymous ID). Omit to use
 *                RevenueCat's auto-generated anonymous ID.
 */
export async function initRevenueCat(userId?: string): Promise<void> {
  if (_initialized) return;

  try {
    const key = Platform.select({
      android: REVENUECAT_API_KEY_ANDROID,
      ios:     REVENUECAT_API_KEY_IOS,
      default: REVENUECAT_API_KEY_ANDROID,
    })!;

    // Verbose SDK logs in dev builds only
    Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.DEBUG : LOG_LEVEL.ERROR);

    Purchases.configure({ apiKey: key });

    // Link purchases to your Firebase user so they survive reinstalls
    // and are accessible across devices on the same account.
    if (userId) {
      await Purchases.logIn(userId);
    }

    _initialized = true;
    if (__DEV__) console.log('[RevenueCat] initialized', userId ? `uid=${userId}` : '(anon)');
  } catch (err) {
    console.error('[RevenueCat] init failed:', err);
  }
}

// ─── Offerings & Packages ─────────────────────────────────────────────────────

/**
 * Returns the Lifetime package from the current (default) offering.
 * Returns null if RevenueCat is not configured or the package isn't found.
 */
export async function getLifetimePackage(): Promise<PurchasesPackage | null> {
  try {
    const offerings = await Purchases.getOfferings();
    const current   = offerings.current;
    if (!current) return null;

    // Prefer the explicit lifetime package; fall back to first available.
    return (
      current.lifetime ??
      current.availablePackages.find(
        (p) => p.product.identifier === 'lifetime',
      ) ??
      current.availablePackages[0] ??
      null
    );
  } catch (err) {
    console.error('[RevenueCat] getLifetimePackage failed:', err);
    return null;
  }
}

/** @deprecated Use getLifetimePackage(). Kept for paywall.tsx compatibility. */
export const getDefaultPackage = getLifetimePackage;

// ─── Purchases ────────────────────────────────────────────────────────────────

/**
 * Purchase a package. Returns true if the Full Lab Pass entitlement is now active.
 * Throws PurchasesError on failure (check .userCancelled to detect cancellations).
 */
export async function purchaseFullLabPass(
  pkg: PurchasesPackage,
): Promise<boolean> {
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return isEntitled(customerInfo);
}

/**
 * Restore previous purchases (e.g. after reinstall or device switch).
 * Returns true if the Full Lab Pass entitlement is now active.
 */
export async function restorePurchases(): Promise<boolean> {
  const customerInfo = await Purchases.restorePurchases();
  return isEntitled(customerInfo);
}

// ─── Entitlement ──────────────────────────────────────────────────────────────

/**
 * Returns true if the given CustomerInfo has an active Full Lab Pass entitlement.
 * Works offline — RevenueCat caches the last known state on device.
 */
export function isEntitled(info: CustomerInfo): boolean {
  return info.entitlements.active[REVENUECAT_ENTITLEMENT] !== undefined;
}

/**
 * Fast entitlement check from cache. Use on app open to sync
 * cross-device purchases without blocking the UI.
 */
export async function checkEntitlement(): Promise<boolean> {
  try {
    const info = await Purchases.getCustomerInfo();
    return isEntitled(info);
  } catch {
    return false;
  }
}

/** Full CustomerInfo object for debugging or detailed display. */
export async function getCustomerInfo(): Promise<CustomerInfo | null> {
  try {
    return await Purchases.getCustomerInfo();
  } catch {
    return null;
  }
}

// ─── RevenueCat Paywall UI ────────────────────────────────────────────────────
// Requires: react-native-purchases-ui
// These present RevenueCat's remotely-configurable paywall templates.

/**
 * Present the RevenueCat paywall only if the user does NOT already have
 * the Full Lab Pass entitlement. The most common call site — use this
 * when a locked feature is tapped.
 *
 * Returns true if the user purchased or restored during the session.
 */
export async function presentPaywallIfNeeded(): Promise<boolean> {
  try {
    const result = await RevenueCatUI.presentPaywallIfNeeded({
      requiredEntitlementIdentifier: REVENUECAT_ENTITLEMENT,
    });

    switch (result) {
      case PAYWALL_RESULT.PURCHASED:
      case PAYWALL_RESULT.RESTORED:
        return true;
      case PAYWALL_RESULT.NOT_PRESENTED: // user already entitled
      case PAYWALL_RESULT.CANCELLED:
      case PAYWALL_RESULT.ERROR:
      default:
        return false;
    }
  } catch (err) {
    console.error('[RevenueCat] presentPaywallIfNeeded failed:', err);
    return false;
  }
}

/**
 * Present the RevenueCat paywall unconditionally (e.g. from a "Upgrade" button).
 * Returns true if the user purchased or restored.
 */
export async function presentPaywall(): Promise<boolean> {
  try {
    const result = await RevenueCatUI.presentPaywall();

    switch (result) {
      case PAYWALL_RESULT.PURCHASED:
      case PAYWALL_RESULT.RESTORED:
        return true;
      default:
        return false;
    }
  } catch (err) {
    console.error('[RevenueCat] presentPaywall failed:', err);
    return false;
  }
}

// ─── Customer Center ──────────────────────────────────────────────────────────
// Requires: react-native-purchases-ui v8.7.0+
// Self-serve support portal: manage subscription, restore, contact support.

/**
 * Present the RevenueCat Customer Center modal.
 *
 * @param onRestoreCompleted  Optional callback fired when restore succeeds
 *                            inside the Customer Center. Use it to sync
 *                            your local paid state without re-checking.
 */
export async function presentCustomerCenter(
  onRestoreCompleted?: (info: CustomerInfo) => void,
): Promise<void> {
  try {
    await RevenueCatUI.presentCustomerCenter({
      callbacks: {
        onRestoreCompleted: ({ customerInfo }) => {
          if (__DEV__) console.log('[RevenueCat] CustomerCenter restore completed');
          onRestoreCompleted?.(customerInfo);
        },
        onRestoreFailed: ({ error }) => {
          console.error('[RevenueCat] CustomerCenter restore failed:', error);
        },
        onShowingManageSubscriptions: () => {
          if (__DEV__) console.log('[RevenueCat] CustomerCenter: manage subscriptions');
        },
        onManagementOptionSelected: ({ option }) => {
          if (__DEV__) console.log('[RevenueCat] CustomerCenter option selected:', option);
        },
        onFeedbackSurveyCompleted: ({ feedbackSurveyOptionId }) => {
          if (__DEV__) console.log('[RevenueCat] Feedback survey:', feedbackSurveyOptionId);
        },
      },
    });
  } catch (err) {
    console.error('[RevenueCat] Customer Center failed:', err);
  }
}
