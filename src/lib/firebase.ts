import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { getFirestore, doc, getDocFromServer, collection, onSnapshot, query, where, getDocs, addDoc, updateDoc, deleteDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { UserRole, UserProfile } from '../types';

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

// Validation check
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
    console.log("Firebase connection established");
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration or connection.");
    }
  }
}
testConnection();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// User Profile helpers
export async function getUserProfile(uid: string): Promise<UserProfile | null> {
  const path = `users/${uid}`;
  try {
    const docRef = doc(db, 'users', uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as UserProfile;
    }
    return null;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, path);
    return null;
  }
}

export async function createUserProfile(uid: string, email: string, displayName: string, role: UserRole = UserRole.INVESTOR) {
  const path = `users/${uid}`;
  try {
    const userProfile: UserProfile = {
      uid,
      email,
      displayName,
      role,
      createdAt: serverTimestamp(),
    };
    await updateDoc(doc(db, 'users', uid), { ...userProfile });
  } catch (error) {
    // If updateDoc fails because it doesn't exist, we might need setDoc, but updateDoc with a new ID often fails.
    // However, in our flow, we often use setDoc for initial creation.
    try {
      const { setDoc } = await import('firebase/firestore');
      const userProfile: UserProfile = {
        uid,
        email,
        displayName,
        role,
        createdAt: serverTimestamp(),
      };
      await setDoc(doc(db, 'users', uid), userProfile);
    } catch (innerError) {
      handleFirestoreError(innerError, OperationType.WRITE, path);
    }
  }
}
