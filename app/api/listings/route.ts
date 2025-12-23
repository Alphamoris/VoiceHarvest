import { NextRequest, NextResponse } from "next/server";

const mockListings = [
  {
    id: "1",
    title: "Fresh Organic Tomatoes",
    description: "Freshly harvested organic tomatoes",
    cropType: "VEGETABLES",
    quantity: 100,
    unit: "KG",
    pricePerUnit: 40,
    qualityGrade: "A",
    images: ["/tomatoes.jpg"],
    location: { state: "Maharashtra", district: "Pune", village: "Khed" },
    status: "ACTIVE",
    sellerId: "1",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Premium Basmati Rice",
    description: "Long grain basmati rice",
    cropType: "GRAINS",
    quantity: 500,
    unit: "KG",
    pricePerUnit: 85,
    qualityGrade: "A+",
    images: ["/rice.jpg"],
    location: { state: "Punjab", district: "Amritsar", village: "Tarn Taran" },
    status: "ACTIVE",
    sellerId: "2",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cropType = searchParams.get("cropType");
    const state = searchParams.get("state");
    const status = searchParams.get("status");

    let filtered = [...mockListings];

    if (cropType) {
      filtered = filtered.filter((l) => l.cropType === cropType);
    }
    if (state) {
      filtered = filtered.filter((l) => l.location.state === state);
    }
    if (status) {
      filtered = filtered.filter((l) => l.status === status);
    }

    return NextResponse.json({
      success: true,
      data: filtered,
      total: filtered.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, description, cropType, quantity, unit, pricePerUnit, qualityGrade, images, location } = body;

    if (!title || !cropType || !quantity || !pricePerUnit) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newListing = {
      id: Date.now().toString(),
      title,
      description,
      cropType,
      quantity,
      unit,
      pricePerUnit,
      qualityGrade,
      images: images || [],
      location,
      status: "ACTIVE",
      sellerId: "current-user",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newListing,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
