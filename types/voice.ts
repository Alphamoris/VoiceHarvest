export interface VoiceCommand {
  id: string;
  userId: string;
  transcription: string;
  action: VoiceAction;
  result: VoiceResult;
  audioUrl?: string;
  confidence: number;
  language?: string;
  timestamp: Date;
}

export type VoiceAction =
  | "CREATE_LISTING"
  | "UPDATE_LISTING"
  | "DELETE_LISTING"
  | "CHECK_ORDERS"
  | "UPDATE_INVENTORY"
  | "GET_PRICE"
  | "UNKNOWN";

export interface VoiceResult {
  success: boolean;
  message: string;
  data?: VoiceResultData;
  error?: string;
  suggestions?: string[];
}

export interface VoiceResultData {
  listingId?: string;
  orderId?: string;
  cropName?: string;
  quantity?: number;
  price?: number;
  extractedEntities?: ExtractedEntities;
}

export interface ExtractedEntities {
  crop?: string;
  quantity?: number;
  unit?: string;
  price?: number;
  action?: string;
}

export type VoiceState = "idle" | "recording" | "processing" | "success" | "error";

export interface VoiceInputState {
  state: VoiceState;
  transcription: string;
  confidence: number;
  error?: string;
}

export interface ProcessVoiceRequest {
  audioData?: ArrayBuffer;
  transcription?: string;
  language?: string;
}

export interface ProcessVoiceResponse {
  transcription: string;
  confidence: number;
  action: VoiceAction;
  result: VoiceResult;
  processedAt: Date;
}

export interface VoiceCommandHistory {
  commands: VoiceCommand[];
  total: number;
  page: number;
}

export const SUPPORTED_LANGUAGES = [
  { code: "en-IN", name: "English (India)" },
  { code: "hi-IN", name: "Hindi" },
  { code: "ta-IN", name: "Tamil" },
  { code: "te-IN", name: "Telugu" },
  { code: "kn-IN", name: "Kannada" },
  { code: "mr-IN", name: "Marathi" },
  { code: "gu-IN", name: "Gujarati" },
  { code: "pa-IN", name: "Punjabi" },
  { code: "bn-IN", name: "Bengali" },
] as const;
