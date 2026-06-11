"use client";

import { useState } from "react";

  export default function InvestigationPage() {
  const [customer, setCustomer] = useState("");
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState("");

  function getRiskStyle(risk: string) {
    switch (risk?.toLowerCase()) {
      case "critical":
        return "bg-red-500/20 text-red-400 border border-red-500";

      case "high":
        return "bg-orange-500/20 text-orange-400 border border-orange-500";

      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border border-yellow-500";

      default:
        return "bg-green-500/20 text-green-400 border border-green-500";
    }
  }

  async function investigate() {
    try {
      setLoading(true);
      setError("");
      setReport(null);
     

      const response = await fetch("/api/agent/investigate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Investigation failed");
      }

      setReport(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white p-8">

      <div className="mb-10">

  <div className="inline-block bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full mb-4">
    🛡️ Enterprise AI Security Platform
  </div>

  <h1 className="text-5xl font-black">
    NEXUS GUARDIAN AI
  </h1>

  <p className="text-xl text-gray-300 mt-3">
    Digital Trust & Fraud Intelligence Platform
  </p>

  <p className="text-gray-500 mt-2">
    Powered by Gemini 2.5 Flash • MongoDB Intelligence • Human Oversight
  </p>

</div>

      {/* Input */}
      <div className="bg-white/5 backdrop-blur-md border border-cyan-500/20 p-6 rounded-3xl mb-6 shadow-2xl">

        <h2 className="text-xl font-semibold mb-4">
          Start Investigation
        </h2>
        <div className="flex gap-3 mb-4">

<button
  onClick={() => setCustomer("John Doe")}
  className="bg-red-500/20 text-red-400 px-3 py-2 rounded-lg"
>
  High Risk Demo
</button>

<button
  onClick={() => setCustomer("Jane Smith")}
  className="bg-green-500/20 text-green-400 px-3 py-2 rounded-lg"
>
  Low Risk Demo
</button>

</div>

        <input
          type="text"
          placeholder="Search by name, email or phone"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
          className="w-full p-3 rounded-lg bg-white text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <button
          onClick={investigate}
          disabled={loading}
          className="mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-lg transition disabled:opacity-50"
        >
          {loading ? "Analyzing with Gemini..." : "Investigate"}
        </button>

      </div>

      {error && (
        <div className="bg-red-800 p-4 rounded mb-6">
          {error}
        </div>
      )}

      {report && (
       <div className="bg-white/5 backdrop-blur-md border border-purple-500/30 p-6 rounded-3xl shadow-2xl">

          <h2 className="text-2xl font-bold mb-4">
            AI Investigation Report
          </h2>

          <div className="space-y-3">

            <p>
              <strong>Agent:</strong> {report.agent}
            </p>

            <p>
              <strong>Customer:</strong> {report.customer.name}
            </p>

            <p>
              <strong>Email:</strong> {report.customer.email}
            </p>

            <hr className="border-gray-700" />

            <div className="flex items-center gap-3">
  <strong>Risk Level:</strong>

  <span
    className={`px-3 py-1 rounded-full font-bold uppercase ${getRiskStyle(
      report.aiInvestigation.riskLevel
    )}`}
  >
    {report.aiInvestigation.riskLevel}
  </span>
</div>

           <div>
  <div className="flex justify-between items-center">
    <strong>AI Trust Score</strong>

    <span className="text-cyan-400 font-bold">
      {report.aiInvestigation.trustScore}/100
    </span>
  </div>

  <div className="mt-2 w-full bg-gray-800 rounded-full h-3 overflow-hidden">
    <div
      className="bg-cyan-400 h-3 rounded-full transition-all duration-700"
      style={{
        width: `${report.aiInvestigation.trustScore}%`,
      }}
    />
  </div>
</div>

            <p>
              <strong>Recommendation:</strong>{" "}
              {report.aiInvestigation.recommendation}
            </p>

            <p>
              <strong>Reason:</strong>
              <br />
              {report.aiInvestigation.reason}
            </p>

            <hr className="border-gray-700" />

            <p>
              <strong>KYC Records Found:</strong>{" "}
              {report.evidence.kycRecordsFound}
            </p>

            <p>
              <strong>Fraud Cases Found:</strong>{" "}
              {report.evidence.fraudCasesFound}
            </p>

            <p className="text-yellow-400">
              <strong>Next Action:</strong>{" "}
              {report.nextAction}
            </p>
            <hr className="border-gray-700 mt-4" />

<h3 className="text-xl font-bold mt-4 mb-3 text-cyan-400">
  AI Agent Execution Timeline
</h3>

<div className="space-y-2">

  <div className="flex items-center gap-3">
    <span className="text-green-400">✓</span>
    <span>Customer record retrieved from MongoDB</span>
  </div>

  <div className="flex items-center gap-3">
    <span className="text-green-400">✓</span>
    <span>KYC records analyzed</span>
  </div>

  <div className="flex items-center gap-3">
    <span className="text-green-400">✓</span>
    <span>Fraud history evaluated</span>
  </div>

  <div className="flex items-center gap-3">
    <span className="text-purple-400">🧠</span>
    <span>Gemini 2.5 Flash completed risk reasoning</span>
  </div>

  <div className="flex items-center gap-3">
    <span className="text-blue-400">📄</span>
    <span>Investigation report saved to MongoDB</span>
  </div>

</div>

<hr className="border-gray-700 mt-6" />

<h3 className="text-xl font-bold mt-4 mb-3 text-cyan-400">
  MongoDB MCP Tools Used
</h3>

<div className="grid grid-cols-1 md:grid-cols-2 gap-3">

  <div className="bg-black p-3 rounded">
    ✓ findCustomer()
  </div>

  <div className="bg-black p-3 rounded">
    ✓ getKYCRecords()
  </div>

  <div className="bg-black p-3 rounded">
    ✓ getFraudCases()
  </div>

  <div className="bg-black p-3 rounded">
    ✓ createInvestigation()
  </div>

  <div className="bg-black p-3 rounded">
    ✓ saveAgentLog()
  </div>

</div>

          </div>

        </div>
      )}

    </main>
  );
}