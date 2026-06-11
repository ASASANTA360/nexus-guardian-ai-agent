import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import User from "@/models/User";
import KYCRecord from "@/models/KYCRecord";
import FraudCase from "@/models/FraudCase";
import Investigation from "@/models/Investigation";
import AgentLog from "@/models/AgentLog";

export async function GET() {
  try {
    await connectDB();

    // Clear old test data
    await User.deleteMany({});
    await KYCRecord.deleteMany({});
    await FraudCase.deleteMany({});
    await Investigation.deleteMany({});
    await AgentLog.deleteMany({});

    // Create customer
    const customer = await User.create({
      fullName: "John Doe",
      email: "john8472@example.com",
      phone: "+2348000000000",
      kycStatus: "verified",
      trustScore: 32,
      riskLevel: "high",
    });

    // KYC Record
    await KYCRecord.create({
      userId: customer._id,
      documentType: "Passport",
      documentNumber: "P8472001",
      verificationStatus: "verified",
      verifiedBy: "AI Agent",
      notes:
        "Document verified but unusual behavioral patterns detected.",
    });

    // Fraud Case
    await FraudCase.create({
      userId: customer._id,
      caseType: "Suspicious Activity",
      riskLevel: "high",
      reason:
        "Multiple devices and suspicious location changes detected.",
    });

    // AI Investigation Report
    await Investigation.create({
      userId: customer._id,
      trustScore: 32,
      riskLevel: "high",
      findings:
        "Customer shows unusual login behavior and location mismatch.",
      recommendation: "manual_review",
      humanApproval: false,
    });

    // Agent Logs
    await AgentLog.create([
      {
        action: "Retrieve customer records",
        toolUsed: "MongoDB MCP findCustomer",
        status: "completed",
      },
      {
        action: "Analyze fraud risk",
        toolUsed: "Gemini AI Reasoning",
        status: "completed",
      },
      {
        action: "Create fraud case",
        toolUsed: "MongoDB MCP createFraudCase",
        status: "completed",
      },
    ]);

    return NextResponse.json({
      success: true,
      message:
        "Nexus Guardian test data seeded successfully",
      customerId: customer._id,
    });

  } catch (error: any) {
    console.error("Seed Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Seeding failed",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}