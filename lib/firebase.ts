import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore";

import type { FirebaseApp } from "firebase/app";
import type { Auth } from "firebase/auth";
import type { Firestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "demo-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:demo",
};

let app: FirebaseApp;
let auth: Auth;
let db: Firestore;

try {
  app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.warn("Firebase initialization failed. Please check your environment variables.");
  app = null as unknown as FirebaseApp;
  auth = null as unknown as Auth;
  db = null as unknown as Firestore;
}

export {
  app,
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  onAuthStateChanged,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  limit,
  Timestamp,
};

export type { FirebaseUser };
