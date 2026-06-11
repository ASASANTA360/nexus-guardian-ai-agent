"use client";

import { useEffect, useState } from "react";

interface Stats {
  totalInvestigations: number;
  criticalCases: number;
  aiDecisions: number;
  pendingReviews: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const response = await fetch("/api/dashboard/stats");

        if (!response.ok) {
          throw new Error("Failed to load dashboard data");
        }

        const data = await response.json();

        if (data.success) {
          setStats(data.statistics);
        }

      } catch (error) {
        console.error("Dashboard Error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <main className="min-h-screen bg-black text-white p-8">
        Loading Executive Intelligence Dashboard...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white p-8">

      {/* Header */}
      <div className="mb-10">

        <div className="inline-block bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full mb-4">
          🏦 Enterprise AI Risk Monitoring
        </div>

        <h1 className="text-5xl font-black">
          Executive Intelligence Dashboard
        </h1>

        <p className="text-gray-400 mt-3 text-lg">
          Real-time fraud intelligence powered by Gemini AI and MongoDB
        </p>

      </div>


      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

        <Card
          title="Total Investigations"
          value={stats?.totalInvestigations || 0}
          icon="📊"
          color="cyan"
        />

        <Card
          title="Critical Risks"
          value={stats?.criticalCases || 0}
          icon="🚨"
          color="red"
        />

        <Card
          title="AI Decisions"
          value={stats?.aiDecisions || 0}
          icon="🧠"
          color="purple"
        />

        <Card
          title="Pending Reviews"
          value={stats?.pendingReviews || 0}
          icon="👨‍⚖️"
          color="yellow"
        />

      </div>


      {/* System Status */}
      <div className="mt-8 bg-white/5 backdrop-blur-md border border-green-500/30 p-6 rounded-3xl">

        <h2 className="text-2xl font-bold mb-4">
          AI Security System Status
        </h2>

        <div className="space-y-3">

          <p className="text-green-400">
            ● Gemini 2.5 Flash AI Engine Online
          </p>

          <p className="text-green-400">
            ● MongoDB Intelligence Layer Connected
          </p>

          <p className="text-green-400">
            ● Fraud Detection Agent Active
          </p>

          <p className="text-green-400">
            ● Human Approval Workflow Enabled
          </p>

        </div>

      </div>

    </main>
  );
}


function Card({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: number;
  icon: string;
  color: string;
}) {

  const styles: Record<string, string> = {
    cyan:
      "border-cyan-500 text-cyan-400",
    red:
      "border-red-500 text-red-400",
    purple:
      "border-purple-500 text-purple-400",
    yellow:
      "border-yellow-500 text-yellow-400",
  };

  return (
    <div
      className={`bg-white/5 backdrop-blur-md border ${styles[color]}
      rounded-3xl p-6 shadow-2xl`}
    >

      <div className="text-3xl mb-3">
        {icon}
      </div>

      <h3 className="text-gray-300">
        {title}
      </h3>

      <p className="text-5xl font-black mt-3">
        {value}
      </p>

    </div>
  );
}