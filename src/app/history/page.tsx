"use client";

import { useEffect, useState } from "react";

interface Investigation {
  id: string;
  customer: string;
  riskLevel: string;
  trustScore: number;
  recommendation: string;
  findings: string;
  date: string;
}

export default function HistoryPage() {
  const [records, setRecords] = useState<Investigation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch("/api/history");
        const data = await response.json();

        if (data.success) {
          setRecords(data.investigations);
        }
      } catch (error) {
        console.error("History fetch failed:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        Loading AI investigation history...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold">
        Nexus Guardian Investigation History
      </h1>

      <p className="text-gray-400 mt-2 mb-8">
        AI audit trail and compliance records
      </p>

      <div className="space-y-6">

        {records.length === 0 ? (
          <div className="bg-gray-900 p-6 rounded-xl">
            No investigations found.
          </div>
        ) : (
          records.map((item) => (
            <div
              key={item.id}
              className="bg-gray-900 rounded-xl p-6"
            >

              <div className="flex justify-between items-center">

                <h2 className="text-2xl font-bold">
                  {item.customer}
                </h2>

                <span className="bg-red-600 px-3 py-1 rounded">
                  {item.riskLevel.toUpperCase()}
                </span>

              </div>

              <div className="mt-4 space-y-2">

                <p>
                  <strong>Trust Score:</strong>
                  {" "}
                  {item.trustScore}/100
                </p>

                <p>
                  <strong>Recommendation:</strong>
                  {" "}
                  {item.recommendation}
                </p>

                <p>
                  <strong>AI Findings:</strong>
                  {" "}
                  {item.findings}
                </p>

                <p className="text-gray-400">
                  {new Date(item.date).toLocaleString()}
                </p>

              </div>

            </div>
          ))
        )}

      </div>

    </main>
  );
}