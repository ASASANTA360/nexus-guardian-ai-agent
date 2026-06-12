import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Audit from "@/models/Audit";

export async function GET() {
  try {
    await connectDB();

    const audits = await Audit.find({})
      .sort({ createdAt: -1 })
      .limit(100);

    return NextResponse.json({
      success: true,
      totalAudits: audits.length,
      audits,
    });

  } catch (error: any) {

    console.error(
      "Wallet History Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load wallet audits",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}