export const APP_NAME = "VoiceHarvest";

export const COLORS = {
  primary: "#1B5E20",
  highlight: "#76FF03",
  accent: "#FFB300",
  success: "#4CAF50",
  error: "#D32F2F",
  warning: "#FFB300",
  info: "#0288D1",
  bgMain: "#FFFBF0",
  bgSurface: "#FFFFFF",
  bgSubtle: "#F5F5F5",
  textPrimary: "#424242",
  textSecondary: "#757575",
  textMuted: "#BDBDBD",
} as const;

export const SPACING = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
} as const;

export const BREAKPOINTS = {
  xs: 320,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const ANIMATION_DURATIONS = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.6,
  slower: 1,
} as const;

export const API_ROUTES = {
  auth: {
    login: "/api/auth/login",
    register: "/api/auth/register",
    logout: "/api/auth/logout",
    verifyToken: "/api/auth/verify-token",
    forgotPassword: "/api/auth/forgot-password",
  },
  listings: {
    base: "/api/listings",
    search: "/api/listings/search",
    byId: (id: string) => `/api/listings/${id}`,
  },
  orders: {
    base: "/api/orders",
    byId: (id: string) => `/api/orders/${id}`,
  },
  voice: {
    processCommand: "/api/voice/process-command",
    transcription: "/api/voice/transcription",
    status: "/api/voice/status",
  },
  user: {
    profile: "/api/user/profile",
    preferences: "/api/user/preferences",
  },
  health: "/api/health",
} as const;

export const ROUTES = {
  HOME: "/",
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  FORGOT_PASSWORD: "/auth/forgot-password",
  DASHBOARD: "/dashboard",
  VOICE: "/dashboard/voice",
  LISTINGS: "/dashboard/listings",
  LISTINGS_CREATE: "/dashboard/listings/create",
  ORDERS: "/dashboard/orders",
  home: "/",
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    verifyEmail: "/auth/verify-email",
  },
  dashboard: {
    home: "/dashboard",
    listings: "/dashboard/listings",
    createListing: "/dashboard/listings/create",
    listingDetail: (id: string) => `/dashboard/listings/${id}`,
    orders: "/dashboard/orders",
    orderDetail: (id: string) => `/dashboard/orders/${id}`,
    voiceChat: "/dashboard/voice-chat",
    history: "/dashboard/history",
    settings: "/dashboard/settings",
  },
} as const;

export const VALIDATION = {
  password: {
    minLength: 8,
    maxLength: 128,
  },
  name: {
    minLength: 2,
    maxLength: 100,
  },
  phone: {
    minLength: 10,
    maxLength: 15,
  },
  description: {
    maxLength: 500,
  },
  quantity: {
    min: 1,
    max: 100000,
  },
  price: {
    min: 1,
    max: 100000,
  },
} as const;

export const ERROR_MESSAGES = {
  auth: {
    invalidCredentials: "Invalid email or password",
    emailInUse: "This email is already registered",
    weakPassword: "Password must be at least 8 characters",
    userNotFound: "No account found with this email",
    networkError: "Network error. Please try again",
    genericError: "Something went wrong. Please try again",
  },
  validation: {
    required: "This field is required",
    invalidEmail: "Please enter a valid email address",
    invalidPhone: "Please enter a valid phone number",
    passwordMismatch: "Passwords do not match",
    minLength: (field: string, length: number) =>
      `${field} must be at least ${length} characters`,
    maxLength: (field: string, length: number) =>
      `${field} must be less than ${length} characters`,
  },
  voice: {
    notSupported: "Voice recording is not supported in your browser",
    permissionDenied: "Microphone permission denied",
    processingFailed: "Failed to process voice command",
    lowConfidence: "Could not understand clearly. Please speak again.",
  },
} as const;

export const TESTIMONIALS = [
  {
    quote:
      "I couldn't use eNAM because I can't read. With VoiceHarvest, I just call and speak. Life-changing!",
    author: "Rajesh Kumar",
    role: "Wheat Farmer, Punjab",
    rating: 5,
  },
  {
    quote:
      "I earn ₹15,000 more per month because I skip the middleman. VoiceHarvest did that.",
    author: "Priya Singh",
    role: "Vegetable Farmer, Haryana",
    rating: 5,
  },
  {
    quote:
      "The best part? I can update my inventory while working. No need to leave the field.",
    author: "Amit Patel",
    role: "Sugarcane Farmer, Gujarat",
    rating: 5,
  },
] as const;

export const FEATURES = [
  {
    icon: "📱",
    title: "No Literacy Required",
    description: "Designed for illiterate & semi-literate farmers",
    highlight: "Works on basic 2G phones",
  },
  {
    icon: "🌍",
    title: "Native Languages",
    description: "Hindi, Tamil, Telugu, Kannada support",
    highlight: "Understand your accent & dialect",
  },
  {
    icon: "💰",
    title: "Better Prices",
    description: "Earn 30-40% more by cutting middlemen",
    highlight: "Direct buyer-to-farmer connection",
  },
  {
    icon: "⚡",
    title: "Easy Updates",
    description: "Update inventory with voice: 'Sold 25kg'",
    highlight: "Your listing updates instantly",
  },
  {
    icon: "📍",
    title: "Live Tracking",
    description: "Track where your crop is",
    highlight: "Pickup to buyer, real-time",
  },
  {
    icon: "✅",
    title: "Guaranteed Trust",
    description: "Secure payments & verified buyers",
    highlight: "Your harvest is protected",
  },
] as const;

export const PROBLEM_STATS = [
  {
    icon: "📚",
    stat: "43-50%",
    label: "Rural farmer illiteracy rate",
    description: "Digital platforms exclude illiterate farmers from modern markets",
  },
  {
    icon: "💰",
    stat: "₹3.5 Lakh Crore",
    label: "Lost to middlemen annually",
    description: "Farmers lose 35% profit because they can't access direct buyers",
  },
  {
    icon: "📵",
    stat: "8-15%",
    label: "Adoption of eNAM platform",
    description: "Even government platforms fail because of literacy requirements",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    icon: "🎤",
    title: "Speak Your Harvest",
    description:
      "Just call our number. Say 'I have 50kg wheat at ₹60/kg' in your language.",
  },
  {
    icon: "🤖",
    title: "AI Understands",
    description:
      "Our AI converts your voice to a listing instantly. No typing. No reading.",
  },
  {
    icon: "🛒",
    title: "Buyers Purchase",
    description: "Buyers see your listing and buy directly from you.",
  },
  {
    icon: "💵",
    title: "You Get Paid",
    description: "Get 30-40% better prices. No middlemen. Direct transaction.",
  },
] as const;
