import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      fullName,
      email,
      phone,
      kycStatus,
    } = body;


    // Validation
    if (!fullName || !email || !phone) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }


    // Check existing customer
    const existingUser = await User.findOne({
      $or: [
        { email },
        { phone },
      ],
    });


    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer already exists",
        },
        {
          status: 409,
        }
      );
    }


    // Create customer
    const user = await User.create({
      fullName,
      email,
      phone,
      kycStatus:
        kycStatus || "pending",

      trustScore: 75,

      riskLevel: "low",
    });


    return NextResponse.json({
      success: true,
      message:
        "Customer registered successfully",

      customer: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        trustScore: user.trustScore,
        riskLevel: user.riskLevel,
      },
    });

  } catch (error: any) {

    console.error(
      "Registration Error:",
      error
    );


    return NextResponse.json(
      {
        success: false,
        message:
          "Registration failed",

        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}