import { NextRequest, NextResponse } from "next/server";

const mockOrders = [
  {
    id: "1",
    listingId: "1",
    buyerId: "buyer1",
    sellerId: "seller1",
    quantity: 50,
    totalAmount: 2000,
    status: "CONFIRMED",
    paymentStatus: "PAID",
    deliveryAddress: {
      fullAddress: "123 Market Road, Pune",
      landmark: "Near Bus Stand",
      pincode: "411001",
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const buyerId = searchParams.get("buyerId");
    const sellerId = searchParams.get("sellerId");

    let filtered = [...mockOrders];

    if (status) {
      filtered = filtered.filter((o) => o.status === status);
    }
    if (buyerId) {
      filtered = filtered.filter((o) => o.buyerId === buyerId);
    }
    if (sellerId) {
      filtered = filtered.filter((o) => o.sellerId === sellerId);
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
    const { listingId, quantity, deliveryAddress } = body;

    if (!listingId || !quantity || !deliveryAddress) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const newOrder = {
      id: Date.now().toString(),
      listingId,
      buyerId: "current-user",
      sellerId: "seller-id",
      quantity,
      totalAmount: quantity * 40,
      status: "PENDING",
      paymentStatus: "PENDING",
      deliveryAddress,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: newOrder,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
