import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInAnonymously,
  updateProfile,
  signOut, 
  onAuthStateChanged,
  User 
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc, 
  serverTimestamp 
} from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

// Initialize Firebase App instance
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Initialize Firestore (support custom databaseId if configured)
export const db = firebaseConfig.firestoreDatabaseId && firebaseConfig.firestoreDatabaseId !== '(default)'
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : getFirestore(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/**
 * Sign in with Google Popup
 */
export async function signInWithGoogle(): Promise<User> {
  const result = await signInWithPopup(auth, googleProvider);
  await recordUserProfile(result.user);
  return result.user;
}

/**
 * Sign in with Email & Password
 */
export async function loginWithEmail(email: string, pass: string): Promise<User> {
  const cred = await signInWithEmailAndPassword(auth, email, pass);
  await recordUserProfile(cred.user);
  return cred.user;
}

/**
 * Register with Email, Password & Display Name
 */
export async function registerWithEmail(email: string, pass: string, name: string): Promise<User> {
  const cred = await createUserWithEmailAndPassword(auth, email, pass);
  if (name.trim()) {
    await updateProfile(cred.user, { displayName: name.trim() });
  }
  await recordUserProfile({
    ...cred.user,
    displayName: name.trim() || cred.user.displayName,
  } as User);
  return cred.user;
}

/**
 * Sign in as Guest Demo user
 */
export async function signInAsGuest(guestName: string = 'Guest Collaborator'): Promise<User> {
  const cred = await signInAnonymously(auth);
  await updateProfile(cred.user, { displayName: guestName });
  await recordUserProfile({
    ...cred.user,
    displayName: guestName,
  } as User);
  return cred.user;
}

/**
 * Sign out
 */
export async function logoutUser(): Promise<void> {
  await signOut(auth);
}

/**
 * Store or update User profile in Firestore
 */
export async function recordUserProfile(user: User): Promise<void> {
  if (!user || !user.uid) return;
  try {
    const userRef = doc(db, 'users', user.uid);
    await setDoc(userRef, {
      id: user.uid,
      email: user.email || `${user.uid.slice(0, 8)}@guest.local`,
      displayName: user.displayName || 'Collaborator',
      photoURL: user.photoURL || '',
      updatedAt: new Date().toISOString(),
    }, { merge: true });
  } catch (err) {
    console.warn('Could not sync user profile to firestore:', err);
  }
}
