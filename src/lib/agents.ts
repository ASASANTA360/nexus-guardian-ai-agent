import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});


/**
 * 🕵️ Investigator Agent
 * Detects suspicious blockchain behavior
 */
export async function investigatorAgent(data: {
  wallet: string;
  network: string;
  transactions: number;
  lastActivityDays: number;
}) {

  const prompt = `
You are Investigator Agent of Nexus Guardian AI.

Your responsibility is blockchain fraud investigation.

Analyze this wallet:

Wallet:
${data.wallet}

Network:
${data.network}

Transactions:
${data.transactions}

Last activity:
${data.lastActivityDays} days ago


Provide:
- Suspicious indicators
- Positive indicators
- Investigation summary

Keep response under 80 words.
`;


  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });


  return response.text ??
    "Investigation unavailable.";
}


/**
 * ⚖️ Compliance Agent
 * Reviews AML/KYC compliance risk
 */
export async function complianceAgent(data: {
  trustScore: number;
  riskLevel: string;
}) {

  const prompt = `
You are Compliance Agent of Nexus Guardian AI.

Review this risk profile:

Trust Score:
${data.trustScore}/100

Risk Level:
${data.riskLevel}


Determine:
- Compliance status
- Required action
- Monitoring recommendation

Keep response under 80 words.
`;


  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });


  return response.text ??
    "Compliance review unavailable.";
}


/**
 * 📊 Risk Analyst Agent
 * Provides risk intelligence and predictions
 */
export async function riskAnalystAgent(data: {
  trustScore: number;
  transactions: number;
  lastActivityDays: number;
}) {

  const prompt = `
You are Risk Analyst Agent of Nexus Guardian AI.

Analyze the following metrics:

Trust Score:
${data.trustScore}/100

Transactions:
${data.transactions}

Last activity:
${data.lastActivityDays} days ago


Provide:
- Current risk trend
- Future concerns
- Overall security outlook

Keep response under 80 words.
`;


  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });


  return response.text ??
    "Risk analysis unavailable.";
}


/**
 * 🧠 Nexus AI Coordinator
 * Combines all agent results
 */
export async function runNexusAgents(data: {
  wallet: string;
  network: string;
  transactions: number;
  lastActivityDays: number;
  trustScore: number;
  riskLevel: string;
}) {

  const [
    investigation,
    compliance,
    riskAnalysis,
  ] = await Promise.all([
    investigatorAgent({
      wallet: data.wallet,
      network: data.network,
      transactions: data.transactions,
      lastActivityDays: data.lastActivityDays,
    }),

    complianceAgent({
      trustScore: data.trustScore,
      riskLevel: data.riskLevel,
    }),

    riskAnalystAgent({
      trustScore: data.trustScore,
      transactions: data.transactions,
      lastActivityDays: data.lastActivityDays,
    }),
  ]);


  return {
    investigator: investigation,
    compliance,
    riskAnalyst: riskAnalysis,

    finalVerdict:
      `
🕵️ Investigator:
${investigation}

⚖️ Compliance:
${compliance}

📊 Risk Analyst:
${riskAnalysis}
      `.trim(),
  };
}