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
  orderAction?: "create" | "cancel" | "status";
  listingId?: string;
}

// Crop patterns for multilingual recognition
const CROP_PATTERNS = [
  { pattern: /tomato|tamatar|टमाटर|தக்காளி|టమాట/i, crop: "tomato", emoji: "🍅" },
  { pattern: /potato|aloo|आलू|உருளைக்கிழங்கு|బంగాళదుంప/i, crop: "potato", emoji: "🥔" },
  { pattern: /onion|pyaz|प्याज|வெங்காயம்|ఉల్లిపాయ/i, crop: "onion", emoji: "🧅" },
  { pattern: /rice|chawal|चावल|அரிசி|బియ్యం/i, crop: "rice", emoji: "🍚" },
  { pattern: /wheat|gehu|गेहूं|கோதுமை|గోధుమ/i, crop: "wheat", emoji: "🌾" },
  { pattern: /mango|aam|आम|மாம்பழம்|మామిడి/i, crop: "mango", emoji: "🥭" },
  { pattern: /banana|kela|केला|வாழைப்பழம்|అరటి/i, crop: "banana", emoji: "🍌" },
  { pattern: /apple|seb|सेब|ஆப்பிள்|ఆపిల్/i, crop: "apple", emoji: "🍎" },
  { pattern: /carrot|gajar|गाजर|கேரட்|కారెట్/i, crop: "carrot", emoji: "🥕" },
  { pattern: /cabbage|patta gobhi|पत्ता गोभी|முட்டைக்கோஸ்|క్యాబేజీ/i, crop: "cabbage", emoji: "🥬" },
];

// Market prices (simulated)
const MARKET_PRICES: Record<string, { min: number; max: number; unit: string }> = {
  tomato: { min: 30, max: 50, unit: "kg" },
  potato: { min: 20, max: 35, unit: "kg" },
  onion: { min: 25, max: 45, unit: "kg" },
  rice: { min: 35, max: 55, unit: "kg" },
  wheat: { min: 25, max: 40, unit: "kg" },
  mango: { min: 60, max: 120, unit: "kg" },
  banana: { min: 40, max: 60, unit: "dozen" },
  apple: { min: 100, max: 180, unit: "kg" },
  carrot: { min: 30, max: 50, unit: "kg" },
  cabbage: { min: 20, max: 35, unit: "kg" },
};

function parseVoiceCommand(text: string): ExtractedData {
  const lowerText = text.toLowerCase();
  const data: ExtractedData = {};

  // Detect action with multilingual support
  if (lowerText.match(/sell|bech|बेच|बेचना|விற்க|అమ్ము/i)) {
    data.action = "CREATE_LISTING";
  } else if (lowerText.match(/buy|kharid|खरीद|खरीदना|order|வாங்க|కొను/i)) {
    data.action = "PLACE_ORDER";
  } else if (lowerText.match(/cancel|रद्द|ரத்து|రద్దు/i)) {
    data.action = "CANCEL_ORDER";
    data.orderAction = "cancel";
  } else if (lowerText.match(/status|स्थिति|நிலை|స్థితి|track|ट्रैक/i)) {
    data.action = "CHECK_ORDERS";
    data.orderAction = "status";
  } else if (lowerText.match(/price|rate|bhav|दाम|कीमत|भाव|விலை|ధర/i)) {
    data.action = "CHECK_PRICES";
  } else if (lowerText.match(/show|list|दिखाओ|காட்டு|చూపించు|search|खोज/i)) {
    data.action = "SEARCH_LISTINGS";
  }

  // Detect crop type
  for (const { pattern, crop } of CROP_PATTERNS) {
    if (pattern.test(text)) {
      data.cropType = crop;
      break;
    }
  }

  // Detect quantity with various units
  const quantityMatch = text.match(/(\d+(?:\.\d+)?)\s*(kg|kilo|kilogram|quintal|ton|टन|किलो|क्विंटल|dozen|दर्जन|pieces|पीस)/i);
  if (quantityMatch) {
    data.quantity = parseFloat(quantityMatch[1]);
    const unit = quantityMatch[2].toLowerCase();
    // Normalize units
    if (unit.match(/kilo|किलो/i)) data.unit = "kg";
    else if (unit.match(/quintal|क्विंटल/i)) data.unit = "quintal";
    else if (unit.match(/ton|टन/i)) data.unit = "ton";
    else if (unit.match(/dozen|दर्जन/i)) data.unit = "dozen";
    else if (unit.match(/pieces|पीस/i)) data.unit = "pieces";
    else data.unit = unit;
  }

  // Detect price
  const priceMatch = text.match(/(\d+(?:\.\d+)?)\s*(rupees|rs|₹|रुपये|रुपए|per|प्रति)/i);
  if (priceMatch) {
    data.price = parseFloat(priceMatch[1]);
  }

  // Detect location (Indian states/cities)
  const locationPatterns = [
    /maharashtra|महाराष्ट्र/i,
    /punjab|पंजाब/i,
    /uttar pradesh|उत्तर प्रदेश/i,
    /madhya pradesh|मध्य प्रदेश/i,
    /karnataka|कर्नाटक/i,
    /gujarat|गुजरात/i,
    /rajasthan|राजस्थान/i,
    /tamil nadu|तमिलनाडु/i,
    /andhra pradesh|आंध्र प्रदेश/i,
    /telangana|तेलंगाना/i,
  ];
  
  for (const pattern of locationPatterns) {
    const match = text.match(pattern);
    if (match) {
      data.location = match[0];
      break;
    }
  }

  return data;
}

function generateResponse(extractedData: ExtractedData): {
  response: string;
  suggestions: string[];
  canCreateOrder: boolean;
  canCreateListing: boolean;
} {
  let response = "";
  let suggestions: string[] = [];
  let canCreateOrder = false;
  let canCreateListing = false;

  const cropInfo = extractedData.cropType 
    ? CROP_PATTERNS.find(p => p.crop === extractedData.cropType) 
    : null;
  const emoji = cropInfo?.emoji || "🌾";

  switch (extractedData.action) {
    case "CREATE_LISTING":
      if (extractedData.cropType && extractedData.quantity && extractedData.price) {
        response = `${emoji} Got it! Creating a listing:\n\n**Crop:** ${extractedData.cropType}\n**Quantity:** ${extractedData.quantity} ${extractedData.unit || "kg"}\n**Price:** ₹${extractedData.price}/${extractedData.unit || "kg"}\n\nShall I create this listing?`;
        suggestions = ["Yes, create listing", "Change quantity", "Change price", "Cancel"];
        canCreateListing = true;
      } else if (extractedData.cropType && extractedData.quantity) {
        const marketPrice = MARKET_PRICES[extractedData.cropType];
        const suggestedPrice = marketPrice ? Math.round((marketPrice.min + marketPrice.max) / 2) : 40;
        response = `${emoji} I understood you want to sell ${extractedData.quantity} ${extractedData.unit || "kg"} of ${extractedData.cropType}.\n\n💡 Suggested price: ₹${suggestedPrice}/${marketPrice?.unit || "kg"} (Market range: ₹${marketPrice?.min}-${marketPrice?.max})\n\nWhat price would you like?`;
        suggestions = [`Set price ₹${suggestedPrice}`, `Set price ₹${suggestedPrice + 10}`, "Tell me the price"];
      } else if (extractedData.cropType) {
        response = `${emoji} You want to sell ${extractedData.cropType}. How much quantity do you have?`;
        suggestions = ["50 kg", "100 kg", "1 quintal", "5 quintal"];
      } else {
        response = "I understood you want to sell something. What crop would you like to sell?";
        suggestions = ["Sell tomatoes", "Sell wheat", "Sell rice", "Sell potatoes"];
      }
      break;

    case "PLACE_ORDER":
      if (extractedData.cropType && extractedData.quantity) {
        const marketPrice = MARKET_PRICES[extractedData.cropType];
        const estimatedPrice = marketPrice ? Math.round((marketPrice.min + marketPrice.max) / 2) : 40;
        const totalCost = extractedData.quantity * estimatedPrice;
        
        response = `🛒 Order Summary:\n\n${emoji} **${extractedData.cropType}**\n📦 Quantity: ${extractedData.quantity} ${extractedData.unit || "kg"}\n💰 Estimated: ₹${totalCost}\n\nI'll find the best farmers near you. Confirm to place order?`;
        suggestions = ["Confirm order", "Change quantity", "Search other crops", "Cancel"];
        canCreateOrder = true;
      } else if (extractedData.cropType) {
        response = `${emoji} You want to buy ${extractedData.cropType}. How much quantity do you need?`;
        suggestions = ["10 kg", "25 kg", "50 kg", "100 kg"];
      } else {
        response = "What would you like to buy? Tell me the crop name and quantity.";
        suggestions = ["Buy 50 kg tomatoes", "Buy 100 kg rice", "Show all vegetables"];
      }
      break;

    case "CHECK_ORDERS":
      response = "📋 Fetching your orders...\n\nYou can check:\n• Pending orders\n• Completed orders\n• Cancelled orders";
      suggestions = ["Show pending orders", "Show completed orders", "Show all orders"];
      break;

    case "CHECK_PRICES":
      if (extractedData.cropType) {
        const price = MARKET_PRICES[extractedData.cropType];
        if (price) {
          response = `${emoji} **${extractedData.cropType.charAt(0).toUpperCase() + extractedData.cropType.slice(1)}** Market Price:\n\n💰 Range: ₹${price.min} - ₹${price.max} per ${price.unit}\n📊 Average: ₹${Math.round((price.min + price.max) / 2)} per ${price.unit}\n\nPrices updated today.`;
        } else {
          response = `I don't have current prices for ${extractedData.cropType}. Would you like to check other crops?`;
        }
        suggestions = ["Check tomato price", "Check rice price", "Check all prices"];
      } else {
        response = "📊 Which crop's price would you like to know?\n\nI have prices for: Tomato, Potato, Onion, Rice, Wheat, Mango, and more.";
        suggestions = ["Tomato price", "Rice price", "Wheat price", "Onion price"];
      }
      break;

    case "SEARCH_LISTINGS":
      if (extractedData.cropType) {
        response = `🔍 Searching for ${extractedData.cropType} listings...\n\nFound 12 listings near you. Shall I show the best deals?`;
        suggestions = ["Show all listings", "Sort by price", "Sort by distance", "Filter by rating"];
      } else {
        response = "🔍 What are you looking for?\n\nYou can search by:\n• Crop name\n• Location\n• Price range";
        suggestions = ["Show vegetables", "Show grains", "Show fruits", "Show all"];
      }
      break;

    case "CANCEL_ORDER":
      response = "Which order would you like to cancel? Please provide the order ID or say 'cancel my last order'.";
      suggestions = ["Cancel last order", "Show my orders", "Go back"];
      break;

    default:
      response = "👋 Hello! I can help you:\n\n🌾 **Sell** - List your crops\n🛒 **Buy** - Order fresh produce\n💰 **Price** - Check market rates\n📋 **Orders** - Track your orders\n\nJust speak naturally!";
      suggestions = ["Sell 100 kg wheat", "Buy tomatoes", "Check rice price", "Show my orders"];
  }

  return { response, suggestions, canCreateOrder, canCreateListing };
}

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let transcription = "";
    let language = "en-IN";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const audioFile = formData.get("audio") as Blob | null;
      language = (formData.get("language") as string) || "en-IN";

      if (audioFile) {
        // Call the transcription API
        const audioBuffer = await audioFile.arrayBuffer();
        const audioBase64 = Buffer.from(audioBuffer).toString("base64");

        const transcribeResponse = await fetch(new URL("/api/voice/transcribe", request.url), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ audioContent: audioBase64, language }),
        });

        if (transcribeResponse.ok) {
          const transcribeData = await transcribeResponse.json();
          transcription = transcribeData.transcription || "";
        }
      }
    } else {
      const body: VoiceProcessRequest = await request.json();
      transcription = body.transcription || "";
      language = body.language || "en-IN";
    }

    if (!transcription) {
      return NextResponse.json({
        success: false,
        error: "No transcription available",
        response: "I couldn't hear you clearly. Please try again.",
        suggestions: ["Try speaking again", "Speak louder", "Check microphone"],
      });
    }

    const extractedData = parseVoiceCommand(transcription);
    const { response, suggestions, canCreateOrder, canCreateListing } = generateResponse(extractedData);

    return NextResponse.json({
      success: true,
      data: {
        transcription,
        language,
        extractedData,
        response,
        suggestions,
        canCreateOrder,
        canCreateListing,
        confidence: 0.92,
        action: extractedData.action || "UNKNOWN",
      },
    });
  } catch (error) {
    console.error("Voice process error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process voice command",
        response: "Sorry, something went wrong. Please try again.",
        suggestions: ["Try again", "Speak slower", "Check connection"],
      },
      { status: 500 }
    );
  }
}
