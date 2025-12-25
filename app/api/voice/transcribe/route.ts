import { NextRequest, NextResponse } from "next/server";

// Google Cloud Speech-to-Text configuration
const GOOGLE_CLOUD_PROJECT_ID = process.env.GOOGLE_CLOUD_PROJECT_ID;
const GOOGLE_CLOUD_PRIVATE_KEY = process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(/\\n/g, "\n");
const GOOGLE_CLOUD_CLIENT_EMAIL = process.env.GOOGLE_CLOUD_CLIENT_EMAIL;

interface SpeechRecognitionResult {
  alternatives: Array<{
    transcript: string;
    confidence: number;
  }>;
  isFinal: boolean;
}

interface GoogleSpeechResponse {
  results?: SpeechRecognitionResult[];
  error?: {
    code: number;
    message: string;
  };
}

// Get access token using service account credentials
async function getAccessToken(): Promise<string> {
  if (!GOOGLE_CLOUD_CLIENT_EMAIL || !GOOGLE_CLOUD_PRIVATE_KEY) {
    throw new Error("Google Cloud credentials not configured");
  }

  const now = Math.floor(Date.now() / 1000);
  const exp = now + 3600; // Token valid for 1 hour

  // Create JWT header and claim
  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const claim = {
    iss: GOOGLE_CLOUD_CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/cloud-platform",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: exp,
  };

  // Encode header and claim
  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedClaim = Buffer.from(JSON.stringify(claim)).toString("base64url");
  const signatureInput = `${encodedHeader}.${encodedClaim}`;

  // Sign the JWT using the private key
  const crypto = await import("crypto");
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signatureInput);
  const signature = sign.sign(GOOGLE_CLOUD_PRIVATE_KEY, "base64url");

  const jwt = `${signatureInput}.${signature}`;

  // Exchange JWT for access token
  const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!tokenResponse.ok) {
    const error = await tokenResponse.text();
    throw new Error(`Failed to get access token: ${error}`);
  }

  const tokenData = await tokenResponse.json();
  return tokenData.access_token;
}

// Transcribe audio using Google Cloud Speech-to-Text
async function transcribeAudio(
  audioContent: string,
  languageCode: string = "en-IN"
): Promise<{ transcript: string; confidence: number }> {
  const accessToken = await getAccessToken();

  const requestBody = {
    config: {
      encoding: "WEBM_OPUS",
      sampleRateHertz: 48000,
      languageCode: languageCode,
      alternativeLanguageCodes: ["hi-IN", "ta-IN", "te-IN", "kn-IN", "mr-IN"],
      enableAutomaticPunctuation: true,
      model: "latest_long",
      useEnhanced: true,
      speechContexts: [
        {
          phrases: [
            "wheat", "rice", "tomato", "potato", "onion", "mango",
            "sell", "buy", "order", "price", "rupees", "kg", "quintal",
            "गेहूं", "चावल", "टमाटर", "आलू", "प्याज", "आम",
            "बेचना", "खरीदना", "कीमत", "रुपये", "किलो", "क्विंटल"
          ],
          boost: 20,
        },
      ],
    },
    audio: {
      content: audioContent,
    },
  };

  const response = await fetch(
    `https://speech.googleapis.com/v1/speech:recognize`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Google Speech API error:", errorText);
    throw new Error(`Speech API error: ${response.status}`);
  }

  const data: GoogleSpeechResponse = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  if (!data.results || data.results.length === 0) {
    return { transcript: "", confidence: 0 };
  }

  const result = data.results[0];
  const alternative = result.alternatives[0];

  return {
    transcript: alternative.transcript || "",
    confidence: alternative.confidence || 0,
  };
}

// Fallback: Use Web Speech API simulation for development
function simulateTranscription(language: string): { transcript: string; confidence: number } {
  const sampleTranscriptions = [
    "I want to sell 100 kg wheat at 50 rupees per kg",
    "मैं 50 किलो टमाटर बेचना चाहता हूं 40 रुपये किलो",
    "Show me all rice listings",
    "What is the current price of onion",
    "I want to buy 200 kg potatoes",
  ];
  
  const randomTranscript = sampleTranscriptions[Math.floor(Math.random() * sampleTranscriptions.length)];
  
  return {
    transcript: randomTranscript,
    confidence: 0.85 + Math.random() * 0.1,
  };
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    
    let audioContent: string | null = null;
    let language = "en-IN";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const audioFile = formData.get("audio") as Blob | null;
      language = (formData.get("language") as string) || "en-IN";

      if (audioFile) {
        const arrayBuffer = await audioFile.arrayBuffer();
        audioContent = Buffer.from(arrayBuffer).toString("base64");
      }
    } else {
      const body = await request.json();
      audioContent = body.audioContent;
      language = body.language || "en-IN";
    }

    let transcriptionResult: { transcript: string; confidence: number };

    // Check if Google Cloud credentials are configured
    if (GOOGLE_CLOUD_PROJECT_ID && GOOGLE_CLOUD_PRIVATE_KEY && GOOGLE_CLOUD_CLIENT_EMAIL) {
      if (!audioContent) {
        return NextResponse.json(
          { error: "No audio content provided" },
          { status: 400 }
        );
      }

      transcriptionResult = await transcribeAudio(audioContent, language);
    } else {
      // Fallback for development without Google Cloud credentials
      console.warn("Google Cloud credentials not configured, using simulation");
      transcriptionResult = simulateTranscription(language);
    }

    return NextResponse.json({
      success: true,
      transcription: transcriptionResult.transcript,
      confidence: transcriptionResult.confidence,
      language: language,
    });
  } catch (error) {
    console.error("Speech-to-text error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Failed to transcribe audio",
      },
      { status: 500 }
    );
  }
}
