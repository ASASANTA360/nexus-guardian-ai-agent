import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";

import User from "@/models/User";
import KYCRecord from "@/models/KYCRecord";
import FraudCase from "@/models/FraudCase";
import Investigation from "@/models/Investigation";
import AgentLog from "@/models/AgentLog";

import { analyzeRisk } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { customer } = body;

    // Step 1: Find Customer
    const user = await User.findOne({
      fullName: customer,
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found",
        },
        {
          status: 404,
        }
      );
    }

    // Log customer lookup
    await AgentLog.create({
      action: "Customer search",
      toolUsed: "MongoDB MCP findCustomer()",
      status: "completed",
      input: customer,
      output: "Customer record retrieved",
    });

    // Step 2: Retrieve KYC records
    const kycRecords = await KYCRecord.find({
      userId: user._id,
    });

    await AgentLog.create({
      action: "KYC analysis",
      toolUsed: "MongoDB MCP getKYCRecords()",
      status: "completed",
      output: `${kycRecords.length} KYC record(s) analyzed`,
    });

    // Step 3: Retrieve fraud history
    const fraudCases = await FraudCase.find({
      userId: user._id,
    });

    // Step 4: Send data to Gemini AI
    const aiResponse = await analyzeRisk({
      customer: user,
      kycRecords,
      fraudCases,
    });

    const aiReport = JSON.parse(aiResponse);

    // Step 5: Save AI investigation report
    const investigation = await Investigation.create({
      userId: user._id,
      trustScore: aiReport.trustScore,
      riskLevel: aiReport.riskLevel,
      findings: aiReport.reason,
      recommendation: aiReport.recommendation,
      humanApproval: false,
    });

    // Step 6: Save AI action log
    await AgentLog.create({
      action: "AI risk analysis",
      toolUsed: "Google Gemini 2.5 Flash",
      status: "completed",
      input: "Customer profile, KYC data, fraud history",
      output: JSON.stringify(aiReport),
    });

    // Final response
    return NextResponse.json({
      success: true,
      agent: "Nexus Guardian AI Agent",

      customer: {
        id: user._id,
        name: user.fullName,
        email: user.email,
        currentTrustScore: user.trustScore,
        currentRiskLevel: user.riskLevel,
      },

      aiInvestigation: {
        id: investigation._id,
        riskLevel: aiReport.riskLevel,
        trustScore: aiReport.trustScore,
        recommendation: aiReport.recommendation,
        reason: aiReport.reason,
      },

      evidence: {
        kycRecordsFound: kycRecords.length,
        fraudCasesFound: fraudCases.length,
      },

      nextAction:
        aiReport.recommendation === "approve"
          ? "Customer approved automatically"
          : "Human approval required",
    });

  } catch (error: any) {
    console.error("Nexus Guardian Agent Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "AI investigation failed",
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}