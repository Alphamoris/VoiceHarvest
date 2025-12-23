import { NextRequest, NextResponse } from "next/server";

interface VoiceProcessRequest {
  audioData?: string;
  transcription?: string;
  language?: string;
}

interface ExtractedData {
  action?: string;
  cropType?: string;
  quantity?: number;
  unit?: string;
  price?: number;
  location?: string;
}

function parseVoiceCommand(text: string): ExtractedData {
  const lowerText = text.toLowerCase();
  const data: ExtractedData = {};

  if (lowerText.includes("sell") || lowerText.includes("bech")) {
    data.action = "CREATE_LISTING";
  } else if (lowerText.includes("buy") || lowerText.includes("kharid")) {
    data.action = "SEARCH_LISTINGS";
  } else if (lowerText.includes("order") || lowerText.includes("status")) {
    data.action = "CHECK_ORDERS";
  } else if (lowerText.includes("price") || lowerText.includes("rate") || lowerText.includes("bhav")) {
    data.action = "CHECK_PRICES";
  }

  const cropPatterns = [
    { pattern: /tomato|tamatar|टमाटर/i, crop: "tomato" },
    { pattern: /potato|aloo|आलू/i, crop: "potato" },
    { pattern: /onion|pyaz|प्याज/i, crop: "onion" },
    { pattern: /rice|chawal|चावल/i, crop: "rice" },
    { pattern: /wheat|gehu|गेहूं/i, crop: "wheat" },
    { pattern: /mango|aam|आम/i, crop: "mango" },
  ];

  for (const { pattern, crop } of cropPatterns) {
    if (pattern.test(text)) {
      data.cropType = crop;
      break;
    }
  }

  const quantityMatch = text.match(/(\d+)\s*(kg|kilo|quintal|ton|किलो|क्विंटल)/i);
  if (quantityMatch) {
    data.quantity = parseInt(quantityMatch[1], 10);
    data.unit = quantityMatch[2].toLowerCase();
  }

  const priceMatch = text.match(/(\d+)\s*(rupees|rs|₹|रुपये)/i);
  if (priceMatch) {
    data.price = parseInt(priceMatch[1], 10);
  }

  return data;
}

export async function POST(request: NextRequest) {
  try {
    const body: VoiceProcessRequest = await request.json();
    const { transcription, language = "hi-IN" } = body;

    if (!transcription) {
      return NextResponse.json(
        { error: "No transcription provided" },
        { status: 400 }
      );
    }

    const extractedData = parseVoiceCommand(transcription);

    let response = "";
    let suggestions: string[] = [];

    switch (extractedData.action) {
      case "CREATE_LISTING":
        if (extractedData.cropType && extractedData.quantity && extractedData.price) {
          response = `I understood you want to sell ${extractedData.quantity} ${extractedData.unit || "kg"} of ${extractedData.cropType} at ₹${extractedData.price}. Shall I create this listing?`;
          suggestions = ["Yes, create listing", "Change quantity", "Change price"];
        } else {
          response = "I understood you want to sell something. Please tell me what crop, how much quantity, and at what price?";
          suggestions = ["Sell 100 kg tomatoes at 40 rupees", "Sell 50 quintal rice at 2000 rupees"];
        }
        break;
      case "SEARCH_LISTINGS":
        response = extractedData.cropType
          ? `Searching for ${extractedData.cropType} listings...`
          : "What would you like to buy? Tell me the crop name.";
        suggestions = ["Show tomatoes", "Show rice", "Show all vegetables"];
        break;
      case "CHECK_ORDERS":
        response = "Fetching your recent orders...";
        suggestions = ["Show pending orders", "Show completed orders"];
        break;
      case "CHECK_PRICES":
        response = extractedData.cropType
          ? `Current market price for ${extractedData.cropType}: ₹40-50 per kg`
          : "Which crop's price would you like to know?";
        suggestions = ["Tomato price", "Rice price", "Wheat price"];
        break;
      default:
        response = "I didn't quite understand. You can ask me to sell crops, buy crops, check orders, or know prices.";
        suggestions = ["Sell my tomatoes", "Show my orders", "What is today's price"];
    }

    return NextResponse.json({
      success: true,
      data: {
        transcription,
        language,
        extractedData,
        response,
        suggestions,
        confidence: 0.85,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process voice command" },
      { status: 500 }
    );
  }
}
