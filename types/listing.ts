import type { Location } from "./auth";

export type CropType = "VEGETABLES" | "FRUITS" | "GRAINS" | "PULSES" | "SPICES" | "DAIRY" | "OTHER";

export type ListingStatus = "ACTIVE" | "PENDING" | "SOLD" | "EXPIRED" | "DRAFT";

export type QualityGrade = "A+" | "A" | "B" | "C" | "GRADE_A" | "GRADE_B" | "GRADE_C";

export type QuantityUnit = "kg" | "quintal" | "ton" | "KG";

export interface Listing {
  id: string;
  title: string;
  description: string;
  cropType: CropType;
  cropName?: string;
  variety?: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  totalPrice?: number;
  qualityGrade: QualityGrade;
  quality?: QualityGrade;
  images: string[];
  photos?: string[];
  location: Location;
  state?: string;
  district?: string;
  pickupDetails?: string;
  status: ListingStatus;
  viewCount?: number;
  interestedBuyers?: number;
  sellerId: string;
  farmerId?: string;
  farmerName?: string;
  seller?: import("./auth").User;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateListingData {
  cropName: string;
  variety?: string;
  quantity: number;
  unit: QuantityUnit;
  pricePerUnit: number;
  quality: QualityGrade;
  description?: string;
  state: string;
  district?: string;
  pickupDetails?: string;
  photos?: string[];
}

export interface UpdateListingData {
  quantity?: number;
  pricePerUnit?: number;
  status?: ListingStatus;
  description?: string;
  photos?: string[];
}

export interface ListingFilters {
  status?: ListingStatus;
  cropName?: string;
  state?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "newest" | "oldest" | "price_asc" | "price_desc";
  page?: number;
  limit?: number;
}

export interface ListingsResponse {
  listings: Listing[];
  total: number;
  page: number;
  totalPages: number;
}

export const CROP_OPTIONS = [
  { type: "GRAINS", label: "Grains", icon: "🌾", crops: ["Wheat", "Rice", "Maize", "Barley", "Millet"] },
  { type: "VEGETABLES", label: "Vegetables", icon: "🥬", crops: ["Tomato", "Potato", "Onion", "Cabbage", "Cauliflower"] },
  { type: "FRUITS", label: "Fruits", icon: "🍎", crops: ["Mango", "Banana", "Apple", "Orange", "Grapes"] },
  { type: "PULSES", label: "Pulses", icon: "🫘", crops: ["Lentils", "Chickpeas", "Green Gram", "Black Gram"] },
  { type: "SPICES", label: "Spices", icon: "🌶️", crops: ["Turmeric", "Chilli", "Cumin", "Coriander"] },
  { type: "DAIRY", label: "Dairy", icon: "🥛", crops: ["Milk", "Curd", "Butter", "Ghee"] },
  { type: "OTHER", label: "Other", icon: "📦", crops: ["Cotton", "Sugarcane", "Jute", "Tea", "Coffee"] },
] as const;

export const QUALITY_GRADES = ["A+", "A", "B", "C"] as const;

export const INDIAN_STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
] as const;
