import { 
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  limit 
} from 'firebase/firestore';
import { db } from '../firebase';
import { GeneratedToken } from '../types';

const TOKENS_COLLECTION = 'canteen_tokens';

/**
 * Save a generated token to Firestore
 */
export async function saveTokenToFirestore(token: GeneratedToken): Promise<void> {
  try {
    const docRef = doc(db, TOKENS_COLLECTION, token.id);
    await setDoc(docRef, {
      ...token,
      syncedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.warn('Could not save token to Firestore (using local storage fallback):', err);
  }
}

/**
 * Delete a token from Firestore
 */
export async function deleteTokenFromFirestore(tokenId: string): Promise<void> {
  try {
    const docRef = doc(db, TOKENS_COLLECTION, tokenId);
    await deleteDoc(docRef);
  } catch (err) {
    console.warn('Could not delete token from Firestore:', err);
  }
}

/**
 * Subscribe in real time to latest campus canteen tokens
 */
export function subscribeToCanteenTokens(
  onTokensUpdate: (tokens: GeneratedToken[]) => void
): () => void {
  try {
    const q = query(
      collection(db, TOKENS_COLLECTION),
      orderBy('createdAt', 'desc'),
      limit(50)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const tokens: GeneratedToken[] = [];
        snapshot.forEach((doc) => {
          tokens.push(doc.data() as GeneratedToken);
        });
        if (tokens.length > 0) {
          onTokensUpdate(tokens);
        }
      },
      (error) => {
        console.warn('Firestore canteen tokens subscription failed (offline fallback active):', error);
      }
    );

    return unsubscribe;
  } catch (err) {
    console.warn('Error setting up firestore listener:', err);
    return () => {};
  }
}
