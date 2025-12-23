import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
  params: Promise<{ id: string }>;
}

const mockOrders: Record<string, object> = {
  "1": {
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
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const order = mockOrders[id];

    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: order,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, paymentStatus } = body;

    const order = mockOrders[id];
    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    const updatedOrder = {
      ...order,
      ...(status && { status }),
      ...(paymentStatus && { paymentStatus }),
      updatedAt: new Date().toISOString(),
    };

    return NextResponse.json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
