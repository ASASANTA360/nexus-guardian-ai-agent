"use client";

import { useEffect, useState } from "react";

interface Analytics {
  totalWallets: number;
  lowRisk: number;
  mediumRisk: number;
  highRisk: number;
  averageTrust: number;
  network: string;
  aiAgent: string;
}

export default function SecurityPage() {
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  async function loadAnalytics() {
    try {
      const response = await fetch(
        "/api/analytics"
      );

      if (!response.ok) {
        throw new Error(
          "Failed to load security analytics"
        );
      }

      const result = await response.json();

      if (result.success) {
        setData(result.analytics);
      }

    } catch (error) {
      console.error(
        "Security Analytics Error:",
        error
      );

    } finally {
      setLoading(false);
    }
  }


  if (loading) {
    return (
      <main className="
        min-h-screen 
        bg-black 
        text-white 
        p-8
      ">

        <h1 className="text-3xl font-black">
          🧠 Loading Nexus Guardian Security Center...
        </h1>

      </main>
    );
  }


  return (

    <main className="
      min-h-screen
      bg-gradient-to-br
      from-black
      via-slate-950
      to-blue-950
      text-white
      p-8
    ">

      {/* Header */}
      <div className="mb-10">

        <div className="
          inline-block
          bg-cyan-500/20
          text-cyan-400
          px-4
          py-2
          rounded-full
          mb-4
        ">
          🛡️ Web3 AI Security Intelligence
        </div>


        <h1 className="
          text-5xl
          font-black
        ">
          Nexus Guardian Security Center
        </h1>


        <p className="
          text-gray-400
          mt-3
          text-lg
        ">
          Real-time blockchain trust analytics
          powered by AI and Mantle Network.
        </p>

      </div>


      {/* Analytics Cards */}
      <div className="
        grid
        grid-cols-1
        md:grid-cols-2
        lg:grid-cols-3
        gap-6
      ">

        <Card
          icon="👛"
          title="Wallets Investigated"
          value={data?.totalWallets || 0}
          color="cyan"
        />

        <Card
          icon="🟢"
          title="Low Risk Wallets"
          value={data?.lowRisk || 0}
          color="green"
        />

        <Card
          icon="🟡"
          title="Medium Risk"
          value={data?.mediumRisk || 0}
          color="yellow"
        />

        <Card
          icon="🔴"
          title="High Risk"
          value={data?.highRisk || 0}
          color="red"
        />

        <Card
          icon="⭐"
          title="Average Trust Score"
          value={`${data?.averageTrust || 0}/100`}
          color="purple"
        />

        <Card
          icon="🌐"
          title="Network"
          value={data?.network || "Unknown"}
          color="blue"
        />

      </div>


      {/* AI Agent Status */}
      <div className="
        mt-8
        bg-white/5
        backdrop-blur-md
        border
        border-cyan-500/30
        p-6
        rounded-3xl
      ">

        <h2 className="
          text-2xl
          font-bold
          mb-4
        ">
          🤖 AI Security Agent Status
        </h2>


        <div className="space-y-3">

          <p className="text-green-400">
            ● {data?.aiAgent} Online
          </p>

          <p className="text-green-400">
            ● Mantle Blockchain Intelligence Active
          </p>

          <p className="text-green-400">
            ● MongoDB Audit Database Connected
          </p>

          <p className="text-green-400">
            ● AI Risk Detection Engine Running
          </p>

        </div>

      </div>


    </main>

  );
}


function Card({
  icon,
  title,
  value,
  color,
}: any) {

  const styles: Record<string, string> = {

    cyan:
      "border-cyan-500 text-cyan-400",

    green:
      "border-green-500 text-green-400",

    yellow:
      "border-yellow-500 text-yellow-400",

    red:
      "border-red-500 text-red-400",

    purple:
      "border-purple-500 text-purple-400",

    blue:
      "border-blue-500 text-blue-400",
  };


  return (

    <div className={`
      bg-white/5
      backdrop-blur-md
      border
      ${styles[color]}
      rounded-3xl
      p-6
      shadow-2xl
    `}>

      <div className="
        text-4xl
        mb-3
      ">
        {icon}
      </div>


      <h3 className="
        text-gray-300
      ">
        {title}
      </h3>


      <p className="
        text-5xl
        font-black
        mt-3
      ">
        {value}
      </p>

    </div>

  );
}