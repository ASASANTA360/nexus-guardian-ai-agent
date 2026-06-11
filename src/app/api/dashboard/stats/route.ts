import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import Investigation from "@/models/Investigation";

export async function GET() {
  try {
    await connectDB();

    // Total investigations
    const totalInvestigations =
      await Investigation.countDocuments();

    // Critical risk cases
    const criticalCases =
      await Investigation.countDocuments({
        riskLevel: "critical",
      });

    // AI decisions made
    const aiDecisions = totalInvestigations;

    // Pending human approvals
    const pendingReviews =
      await Investigation.countDocuments({
        humanApproval: false,
      });

    return NextResponse.json({
      success: true,

      statistics: {
        totalInvestigations,
        criticalCases,
        aiDecisions,
        pendingReviews,
      },
    });

  } catch (error: any) {
    console.error("Dashboard Stats Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load dashboard statistics",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}