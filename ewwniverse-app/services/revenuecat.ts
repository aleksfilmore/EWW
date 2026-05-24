/**
 * RevenueCat service — wraps react-native-purchases.
 *
 * SETUP REQUIRED:
 * 1. Create a RevenueCat account at app.revenuecat.com
 * 2. Create a project and add iOS + Android apps
 * 3. Create an Entitlement "full_lab_pass"
 * 4. Create a Product "eww_full_lab_pass" (€3.99 one-time) in App Store Connect
 *    and Google Play Console, then link to the entitlement in RevenueCat
 * 5. Replace REVENUECAT_API_KEY_ANDROID and REVENUECAT_API_KEY_IOS below
 *    with your real public SDK keys from the RevenueCat dashboard
 */

import Purchases, {
  PurchasesPackage,
  PurchasesOffering,
  CustomerInfo,
} from 'react-native-purchases';
import { Platform } from 'react-native';
import { REVENUECAT_ENTITLEMENT } from '@/constants/game';

// ─── Replace these with your real RevenueCat SDK keys ─────────────────────────
// Found in: RevenueCat Dashboard → Your App → API Keys → Public app-specific key
const REVENUECAT_API_KEY_ANDROID = 'YOUR_REVENUECAT_ANDROID_KEY_HERE';
const REVENUECAT_API_KEY_IOS     = 'YOUR_REVENUECAT_IOS_KEY_HERE';
// ──────────────────────────────────────────────────────────────────────────────

let _initialized = false;

/** Call once on app start (in _layout.tsx AppBootstrap). */
export async function initRevenueCat(userId?: string): Promise<void> {
  if (_initialized) return;
  try {
    const key = Platform.select({
      android: REVENUECAT_API_KEY_ANDROID,
      ios:     REVENUECAT_API_KEY_IOS,
      default: REVENUECAT_API_KEY_ANDROID,
    });

    if (key === 'YOUR_REVENUECAT_ANDROID_KEY_HERE' ||
        key === 'YOUR_REVENUECAT_IOS_KEY_HERE') {
      // Placeholder key — skip init in dev
      console.warn('[RevenueCat] API key not configured. Purchase flow will be mocked.');
      return;
    }

    Purchases.configure({ apiKey: key });
    if (userId) {
      await Purchases.logIn(userId);
    }
    _initialized = true;
  } catch (err) {
    console.error('[RevenueCat] init failed:', err);
  }
}

/** Returns the current offering's default package, or null on error. */
export async function getDefaultPackage(): Promise<PurchasesPackage | null> {
  try {
    const offerings = await Purchases.getOfferings();
    return offerings.current?.availablePackages?.[0] ?? null;
  } catch {
    return null;
  }
}

/** Purchase the Full Lab Pass. Returns true on success, throws on cancel/error. */
export async function purchaseFullLabPass(
  pkg: PurchasesPackage,
): Promise<boolean> {
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return isEntitled(customerInfo);
}

/** Restore previous purchases. Returns true if entitlement is active. */
export async function restorePurchases(): Promise<boolean> {
  const customerInfo = await Purchases.restorePurchases();
  return isEntitled(customerInfo);
}

/** Returns true if the user has an active Full Lab Pass entitlement. */
export function isEntitled(info: CustomerInfo): boolean {
  return info.entitlements.active[REVENUECAT_ENTITLEMENT] !== undefined;
}

/** Check entitlement status on app open (fast cached read). */
export async function checkEntitlement(): Promise<boolean> {
  try {
    const info = await Purchases.getCustomerInfo();
    return isEntitled(info);
  } catch {
    return false;
  }
}
