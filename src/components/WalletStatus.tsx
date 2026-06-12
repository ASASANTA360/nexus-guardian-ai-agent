"use client";

import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";

export default function WalletStatus() {
  const [address, setAddress] = useState("");
  const [profile, setProfile] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    checkWallet();
  }, []);

  async function checkWallet() {
    try {
      if (!(window as any).ethereum) return;

      const provider = new BrowserProvider(
        (window as any).ethereum
      );

      const accounts = await provider.send(
        "eth_accounts",
        []
      );

      if (accounts.length > 0) {
        const wallet = accounts[0];

        setAddress(wallet);

        analyzeWallet(wallet);
      }

    } catch (error) {
      console.error(
        "Wallet check failed:",
        error
      );
    }
  }


  async function connectWallet() {
    try {

      if (!(window as any).ethereum) {
        alert("Please install MetaMask");
        return;
      }


      const provider = new BrowserProvider(
        (window as any).ethereum
      );


      const accounts = await provider.send(
        "eth_requestAccounts",
        []
      );


      const wallet = accounts[0];

      setAddress(wallet);

      analyzeWallet(wallet);

    } catch (error) {

      console.error(
        "Wallet connection failed:",
        error
      );

    }
  }


  async function analyzeWallet(wallet: string) {

    try {

      setAnalyzing(true);


      const response = await fetch(
        "/api/wallet/profile",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            wallet,
          }),
        }
      );


      const data = await response.json();


      if (data.success) {
        setProfile(data.profile);
      }

    } catch (error) {

      console.error(
        "AI analysis failed:",
        error
      );

    } finally {

      setAnalyzing(false);

    }

  }


  function shortAddress(wallet: string) {

    return (
      wallet.slice(0, 6) +
      "..." +
      wallet.slice(-4)
    );

  }


  if (!address) {

    return (
      <button
        onClick={connectWallet}
        className="
          bg-cyan-500
          hover:bg-cyan-400
          text-black
          font-bold
          px-4
          py-2
          rounded-xl
          transition
        "
      >
        🔗 Connect MetaMask
      </button>
    );

  }


  return (

    <div className="relative flex items-center gap-3">

      {/* Connected */}
      <div className="
        bg-green-500/10
        text-green-400
        px-3
        py-2
        rounded-xl
        text-sm
      ">
        🟢 Connected
      </div>


      {/* Address */}
      <button
  onClick={() => setShowReport(!showReport)}
  className="
    bg-cyan-500/10
    hover:bg-cyan-500/20
    text-white
    px-3
    py-2
    rounded-xl
    text-sm
    transition
  "
>
  👛 {shortAddress(address)}
</button>


      {/* Loading */}
      {analyzing && (

        <div className="
          bg-purple-500/10
          text-purple-400
          px-3
          py-2
          rounded-xl
          text-sm
        ">
          🧠 AI Analyzing...
        </div>

      )}


      {/* Premium AI Report */}
      {profile && showReport && (

        <div className="
          absolute
          top-14
          right-0
          w-80
          bg-black/95
          border
          border-cyan-500/40
          rounded-2xl
          p-5
          shadow-2xl
          backdrop-blur-lg
          z-50
          text-white
        ">

          <div className="flex justify-between items-center mb-4">

  <h3 className="text-cyan-400 text-lg font-bold">
    🛡️ Nexus Guardian AI Report
  </h3>

  <button
    onClick={() => setShowReport(false)}
    className="
      text-gray-400
      hover:text-white
      text-lg
      transition
    "
  >
    ✕
  </button>

</div>


          <div className="space-y-2 text-sm">

            <p>
              📊 Trust Score:
              <span className="text-green-400 font-bold">
                {" "}
                {profile.trustScore}/100
              </span>
            </p>


            <p>
              🚨 Risk Level:
              <span
                 className={
                 profile.riskLevel === "LOW"
                 ? "text-green-400 font-bold"
                 : profile.riskLevel === "MEDIUM"
                  ? "text-yellow-400 font-bold"
                  : "text-red-500 font-bold"
                 }
                  >
                    {" "}
                   {profile.riskLevel}
                </span>
              </p>


            <p>
              ✅ Decision:
              <span className="text-cyan-400 font-bold">
                {" "}
                {profile.recommendation}
              </span>
            </p>


            <p>
              🌐 Network:
              {" "}
              {profile.network}
            </p>


            <p>
              📈 Transactions:
              {" "}
              {profile.transactions}
            </p>


            <p>
              ⏳ Last Activity:
              {" "}
              {profile.lastActivityDays} days ago
            </p>


            <div className="
              mt-3
              p-3
              rounded-xl
              bg-cyan-500/10
            ">

              <p className="
                font-bold
                text-cyan-400
              ">
                🧠 AI Findings
              </p>


              <p className="text-gray-300">
                {profile.findings}
              </p>

            </div>


            <div className="
              border-t
              border-gray-700
              mt-3
              pt-3
              text-xs
              text-gray-400
            ">

              <p>
                Agent: {profile.agent}
              </p>

              <p>
                Analyzed:
                {" "}
                {new Date(
                  profile.analyzedAt
                ).toLocaleString()}
              </p>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}