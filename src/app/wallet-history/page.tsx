"use client";

import { useEffect, useState } from "react";

export default function WalletHistoryPage() {
  const [audits, setAudits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    loadHistory();
  }, []);


  async function loadHistory() {
    try {

      const response = await fetch(
        "/api/wallet-history"
      );

      const data = await response.json();


      if (data.success) {
        setAudits(data.audits);
      }

    } catch (error) {

      console.error(
        "Failed to load wallet history:",
        error
      );

    } finally {

      setLoading(false);

    }
  }


  function getRiskColor(level: string) {

    if (level === "LOW") {
      return "text-green-400";
    }

    if (level === "MEDIUM") {
      return "text-yellow-400";
    }

    return "text-red-500";
  }


  function shortWallet(wallet: string) {
    return (
      wallet.slice(0, 6) +
      "..." +
      wallet.slice(-4)
    );
  }


  return (

    <main className="min-h-screen bg-black text-white p-6">

      <h1 className="text-4xl font-black mb-2">
        🛡️ Wallet Intelligence
      </h1>


      <p className="text-gray-400 mb-8">
        Nexus Guardian AI Audit History
      </p>


      {loading && (

        <div className="text-cyan-400">
          🧠 Loading AI investigations...
        </div>

      )}


      {!loading && audits.length === 0 && (

        <div className="text-gray-400">
          No wallet audits found.
        </div>

      )}


      <div className="
        grid 
        grid-cols-1 
        md:grid-cols-2 
        lg:grid-cols-3 
        gap-5
      ">

        {audits.map((audit) => (

          <div
            key={audit._id}
            className="
              bg-white/5
              border
              border-cyan-500/20
              rounded-2xl
              p-5
              backdrop-blur-md
            "
          >

            <h2 className="text-cyan-400 font-bold mb-3">
              👛 {shortWallet(audit.wallet)}
            </h2>


            <p>
              📊 Trust Score:
              <span className="text-green-400 font-bold">
                {" "}
                {audit.trustScore}/100
              </span>
            </p>


            <p>
              🚨 Risk:
              <span className={`${getRiskColor(audit.riskLevel)} font-bold`}>
                {" "}
                {audit.riskLevel}
              </span>
            </p>


            <p>
              ✅ Decision:
              <span className="text-cyan-400 font-bold">
                {" "}
                {audit.recommendation}
              </span>
            </p>


            <p>
              🌐 Network:
              {" "}
              {audit.network}
            </p>


            <p>
              📈 Transactions:
              {" "}
              {audit.transactions}
            </p>


            <p>
              ⏳ Last Activity:
              {" "}
              {audit.lastActivityDays} days ago
            </p>


            <div className="
              mt-3
              bg-cyan-500/10
              rounded-xl
              p-3
            ">

              <p className="text-cyan-400 font-bold">
                🧠 AI Findings
              </p>

              <p className="text-gray-300 text-sm">
                {audit.findings}
              </p>

            </div>


            <div className="
              mt-4
              pt-3
              border-t
              border-gray-700
              text-xs
              text-gray-400
            ">

              🤖 {audit.agent}

              <br />

              🕒 {
                new Date(
                  audit.analyzedAt
                ).toLocaleString()
              }

            </div>

          </div>

        ))}

      </div>

    </main>

  );
}