import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import Investigation from "@/models/Investigation";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    const investigations = await Investigation.find({})
      .sort({ createdAt: -1 });

    const data = await Promise.all(
      investigations.map(async (item: any) => {
        const user = await User.findById(item.userId);

        return {
          id: item._id,
          customer: user?.fullName || "Unknown",
          riskLevel: item.riskLevel,
          trustScore: item.trustScore,
          recommendation: item.recommendation,
          findings: item.findings,
          date: item.createdAt,
        };
      })
    );

    return NextResponse.json({
      success: true,
      totalInvestigations: data.length,
      investigations: data,
    });

  } catch (error: any) {
    console.error("History API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load history",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}