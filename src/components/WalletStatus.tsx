"use client";

import { useEffect, useState } from "react";
import { BrowserProvider } from "ethers";

export default function WalletStatus() {
  const [address, setAddress] = useState("");

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
        setAddress(accounts[0]);
      }

    } catch (error) {
      console.error("Wallet check failed:", error);
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

      setAddress(accounts[0]);

    } catch (error) {
      console.error(
        "Wallet connection failed:",
        error
      );
    }
  }


  function shortAddress(wallet: string) {
    return (
      wallet.slice(0, 6) +
      "..." +
      wallet.slice(-4)
    );
  }


  // Idan wallet bai connect ba
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
        "
      >
        🔗 Connect MetaMask
      </button>
    );
  }


  // Idan wallet ya connect
  return (
    <div className="flex gap-2">

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

      <div className="
        bg-cyan-500/10
        text-white
        px-3
        py-2
        rounded-xl
        text-sm
      ">
        👛 {shortAddress(address)}
      </div>

    </div>
  );
}