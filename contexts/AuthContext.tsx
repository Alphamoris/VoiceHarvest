"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User as FirebaseUser,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export type UserRole = "FARMER" | "BUYER" | "ADMIN";

export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  role: UserRole;
  profileImage?: string;
  location?: {
    state: string;
    district: string;
    village?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

interface AuthContextType {
  user: User | null;
  firebaseUser: FirebaseUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, userData: Partial<User>) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (fbUser) {
        setFirebaseUser(fbUser);
        setUser({
          id: fbUser.uid,
          email: fbUser.email || "",
          name: fbUser.displayName || "User",
          role: "FARMER",
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      } else {
        setFirebaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to login";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email: string, password: string, userData: Partial<User>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      setUser({
        id: result.user.uid,
        email: result.user.email || email,
        name: userData.name || "User",
        role: userData.role || "FARMER",
        phone: userData.phone,
        location: userData.location,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to register";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      setUser(null);
      setFirebaseUser(null);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to logout";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setLoading(true);
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to send reset email";
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => setError(null);

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        firebaseUser,
        loading,
        isAuthenticated,
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
