import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, phone, role, location } = body;

    if (!name || !email || !password || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Registration handled by Firebase Auth on client",
      user: {
        id: "temp-id",
        name,
        email,
        phone,
        role,
        location,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
