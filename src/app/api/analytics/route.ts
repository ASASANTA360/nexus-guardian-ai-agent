import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Audit from "@/models/Audit";

export async function GET() {
  try {
    await connectDB();

    const audits = await Audit.find({});

    const total = audits.length;

    const lowRisk = audits.filter(
      (a) => a.riskLevel === "LOW"
    ).length;

    const mediumRisk = audits.filter(
      (a) => a.riskLevel === "MEDIUM"
    ).length;

    const highRisk = audits.filter(
      (a) => a.riskLevel === "HIGH"
    ).length;


    const totalScore = audits.reduce(
      (sum, audit) => sum + audit.trustScore,
      0
    );


    const averageTrust =
      total > 0
        ? Math.round(totalScore / total)
        : 0;


    return NextResponse.json({
      success: true,

      analytics: {
        totalWallets: total,

        lowRisk,

        mediumRisk,

        highRisk,

        averageTrust,

        network: "Mantle",

        aiAgent: "Nexus Guardian AI",
      },
    });

  } catch (error: any) {

    console.error(
      "Analytics Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to load analytics",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}