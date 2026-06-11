import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

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