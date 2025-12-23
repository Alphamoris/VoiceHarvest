"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  auth,
  db,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  sendPasswordResetEmail,
  sendEmailVerification,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
  FirebaseUser,
} from "@/lib/firebase";
import type { User, UserType, LoginCredentials, RegisterData } from "@/types";

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setFirebaseUser(fbUser);
        try {
          const userDoc = await getDoc(doc(db, "users", fbUser.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setUser({
              id: fbUser.uid,
              email: fbUser.email || "",
              name: userData.fullName || userData.name || "",
              fullName: userData.fullName || "",
              phone: userData.phone || "",
              role: userData.userType || userData.role || "FARMER",
              userType: userData.userType || "FARMER",
              state: userData.state || "",
              profileComplete: userData.profileComplete || false,
              avatar: userData.avatar,
              createdAt: userData.createdAt?.toDate() || new Date(),
              updatedAt: userData.updatedAt?.toDate() || new Date(),
              lastLogin: userData.lastLogin?.toDate(),
            });
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        setFirebaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithEmailAndPassword(
        auth,
        credentials.email,
        credentials.password
      );
      await updateDoc(doc(db, "users", result.user.uid), {
        lastLogin: serverTimestamp(),
      });
    } catch (err: unknown) {
      const errorMessage = getFirebaseErrorMessage(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      await setDoc(doc(db, "users", result.user.uid), {
        email: data.email,
        fullName: data.fullName,
        phone: data.phone,
        userType: data.userType,
        state: data.state,
        profileComplete: false,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });

      await sendEmailVerification(result.user);
    } catch (err: unknown) {
      const errorMessage = getFirebaseErrorMessage(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setFirebaseUser(null);
    } catch (err: unknown) {
      const errorMessage = getFirebaseErrorMessage(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (err: unknown) {
      const errorMessage = getFirebaseErrorMessage(err);
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        error,
        login,
        register,
        logout,
        resetPassword,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

function getFirebaseErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "code" in error) {
    const code = (error as { code: string }).code;
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered";
      case "auth/invalid-email":
        return "Invalid email address";
      case "auth/operation-not-allowed":
        return "Email/password accounts are not enabled";
      case "auth/weak-password":
        return "Password must be at least 8 characters";
      case "auth/user-disabled":
        return "This account has been disabled";
      case "auth/user-not-found":
        return "No account found with this email";
      case "auth/wrong-password":
        return "Invalid email or password";
      case "auth/invalid-credential":
        return "Invalid email or password";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please try again later";
      default:
        return "An error occurred. Please try again";
    }
  }
  return "An unexpected error occurred";
}

export type { UserType };
