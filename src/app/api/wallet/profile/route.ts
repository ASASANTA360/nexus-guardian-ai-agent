import { NextResponse } from "next/server";
import { analyzeMantleWallet } from "@/lib/mantle";
import connectDB from "@/lib/mongodb";
import Audit from "@/models/Audit";
import { generateWalletRiskExplanation } from "@/lib/gemini";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { wallet } = body;
  
    if (!wallet) {
    
      return NextResponse.json(

        {
          success: false,
          message: "Wallet address required",
        },
        {
          status: 400,
        }
      );
    }


    // Mantle Wallet Intelligence
    const mantleData =
      await analyzeMantleWallet(wallet);


    // Nexus Guardian AI Trust Calculation
    let trustScore = 100;

    trustScore -= mantleData.riskSignals * 25;


    if (mantleData.transactions < 10) {
      trustScore -= 20;
    }


    if (mantleData.lastActivityDays > 60) {
      trustScore -= 15;
    }


    // Limit score between 0 and 100
    trustScore = Math.max(
      0,
      Math.min(100, trustScore)
    );


    let riskLevel = "LOW";
    let recommendation = "APPROVE";
   let findings = "";


    if (trustScore < 80) {
      riskLevel = "MEDIUM";
      recommendation = "REVIEW";

      findings =
        "Some unusual patterns detected. Manual review recommended.";
    }


    if (trustScore < 50) {
      riskLevel = "HIGH";
      recommendation = "REJECT";

    // 🧠 Gemini AI writes the security report
      findings = await generateWalletRiskExplanation({
  wallet,

  trustScore,

  riskLevel,

  transactions: mantleData.transactions,

  lastActivityDays: mantleData.lastActivityDays,

  network: mantleData.network,
});

      findings =
        "High risk signals detected by Nexus Guardian AI.";
    }
// Save AI Audit to MongoDB
await Audit.create({
  wallet,

  trustScore,

  riskLevel,

  recommendation,

  network: mantleData.network,

  transactions: mantleData.transactions,

  lastActivityDays:
    mantleData.lastActivityDays,

  findings,

  agent: "Nexus Guardian AI",

  analyzedAt: new Date(),
});

    return NextResponse.json({
      success: true,

      profile: {
        wallet,

        network:
          mantleData.network,

        transactions:
          mantleData.transactions,

        lastActivityDays:
          mantleData.lastActivityDays,

        trustScore,

        riskLevel,

        recommendation,

        findings,

        agent:
          "Nexus Guardian AI",

        analyzedAt:
          new Date().toISOString(),
      },
    });

  } catch (error: any) {

    console.error(
      "Mantle AI Error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "AI wallet investigation failed",

        error:
          error.message,
      },
      {
        status: 500,
      }
    );

  }
}