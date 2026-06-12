import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});


/**
 * Nexus Guardian KYC Investigation AI
 */
export async function analyzeRisk(data: {
  customer: any;
  kycRecords: any[];
  fraudCases: any[];
}) {

  const prompt = `
You are Nexus Guardian AI, an expert fraud detection and KYC investigation agent.

Analyze the customer information below and generate a professional investigation report.

Customer Profile:
${JSON.stringify(data.customer, null, 2)}

KYC Records:
${JSON.stringify(data.kycRecords, null, 2)}

Fraud History:
${JSON.stringify(data.fraudCases, null, 2)}

Provide your response in this JSON format:

{
  "riskLevel": "low | medium | high | critical",
  "trustScore": 0-100,
  "recommendation": "approve | manual_review | reject",
  "reason": "short explanation"
}

Only return valid JSON.
`;


  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });


  const text = response.text ?? "";


  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();


  return cleaned;
}



/**
 * Nexus Guardian Web3 Wallet Security AI
 */
export async function generateWalletRiskExplanation(data: {
  wallet: string;
  trustScore: number;
  riskLevel: string;
  transactions: number;
  lastActivityDays: number;
  network: string;
}) {

  const prompt = `
You are Nexus Guardian AI, an advanced blockchain security investigator.

Analyze this wallet information and create a professional security report.

Wallet Address:
${data.wallet}

Blockchain Network:
${data.network}

Trust Score:
${data.trustScore}/100

Risk Level:
${data.riskLevel}

Total Transactions:
${data.transactions}

Last Activity:
${data.lastActivityDays} days ago


Your report must include:

1. Trust assessment
2. Positive security indicators
3. Possible risk indicators
4. Recommended action

Write a concise professional report under 120 words.
`;


  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });


  return (
    response.text ??
    "Nexus Guardian AI could not generate a wallet security report."
  );
}