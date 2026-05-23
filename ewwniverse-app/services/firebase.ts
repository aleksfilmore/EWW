/**
 * Firebase service — initialised via @react-native-firebase/app
 * (uses google-services.json on Android, GoogleService-Info.plist on iOS)
 *
 * @react-native-firebase auto-initialises from the native config files —
 * no explicit `initializeApp()` call needed.
 */
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { UserProfile } from '@/types/user';

// ─────────────────────────────────────────────
// Auth helpers
// ─────────────────────────────────────────────

/** Create / retrieve anonymous Firebase user on first launch */
export async function signInAnonymously(): Promise<FirebaseAuthTypes.User> {
  const { currentUser } = auth();
  if (currentUser) return currentUser;
  const { user } = await auth().signInAnonymously();
  return user;
}

/** Observe auth state changes */
export function onAuthStateChanged(
  callback: (user: FirebaseAuthTypes.User | null) => void,
) {
  return auth().onAuthStateChanged(callback);
}

// ─────────────────────────────────────────────
// Firestore helpers
// ─────────────────────────────────────────────

const db = firestore();

/** Load user profile from Firestore */
export async function loadUserProfile(uid: string): Promise<UserProfile | null> {
  const snap = await db.collection('users').doc(uid).get();
  if (!snap.exists) return null;
  return snap.data() as UserProfile;
}

/** Save / merge user profile to Firestore */
export async function saveUserProfile(
  uid: string,
  data: Partial<UserProfile>,
): Promise<void> {
  await db.collection('users').doc(uid).set(data, { merge: true });
}

/** Mark a creature as classified in Firestore */
export async function setCreatureStateRemote(
  uid: string,
  creatureId: string,
  state: string,
): Promise<void> {
  await db
    .collection('users')
    .doc(uid)
    .collection('creatures')
    .doc(creatureId)
    .set({ state, updated_at: firestore.FieldValue.serverTimestamp() }, { merge: true });
}

/** Fetch all creature states for a user */
export async function loadCreatureStates(
  uid: string,
): Promise<Record<string, { state: string }>> {
  const snap = await db.collection('users').doc(uid).collection('creatures').get();
  const result: Record<string, { state: string }> = {};
  snap.forEach((doc) => {
    result[doc.id] = doc.data() as { state: string };
  });
  return result;
}
