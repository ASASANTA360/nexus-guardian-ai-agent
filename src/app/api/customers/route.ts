import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import User from "@/models/User";
import FraudCase from "@/models/FraudCase";
import Investigation from "@/models/Investigation";

export async function GET() {
  try {
    await connectDB();

    // Get all customers
    const customers = await User.find({})
      .sort({ createdAt: -1 });

    // Dashboard statistics
    const totalCustomers = await User.countDocuments();

    const highRiskCustomers = await User.countDocuments({
      riskLevel: "high",
    });

    const pendingReviews = await Investigation.countDocuments({
      humanApproval: false,
    });

    const activeFraudCases = await FraudCase.countDocuments({
      status: {
        $in: ["open", "under_review"],
      },
    });

    return NextResponse.json({
      success: true,

      statistics: {
        totalCustomers,
        highRiskCustomers,
        pendingReviews,
        activeFraudCases,
      },

      customers,
    });

  } catch (error: any) {
    console.error("Customer API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch customer data",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}