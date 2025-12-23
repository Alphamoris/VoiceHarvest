export type UserRole = "FARMER" | "BUYER" | "ADMIN";
export type UserType = "FARMER" | "BUYER";

export interface Location {
  state: string;
  district?: string;
  village?: string;
  pincode?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  fullName?: string;
  phone?: string;
  role: UserRole;
  userType?: UserType;
  profileImage?: string;
  avatar?: string;
  location?: Location;
  state?: string;
  preferredLang?: string;
  profileComplete?: boolean;
  isVerified?: boolean;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
}

export interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  fullName: string;
  phone: string;
  userType: UserType;
  state: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface SessionData {
  userId: string;
  email: string;
  userType: UserType;
  expiresAt: number;
}
