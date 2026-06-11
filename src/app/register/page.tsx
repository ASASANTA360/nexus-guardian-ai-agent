"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    kycStatus: "pending",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function registerCustomer() {
    try {
      setLoading(true);
      setError("");
      setMessage("");

      const response = await fetch(
        "/api/customers/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed"
        );
      }

      setMessage(
        `Customer ${data.customer.fullName} registered successfully`
      );

      setForm({
        fullName: "",
        email: "",
        phone: "",
        kycStatus: "pending",
      });

    } catch (err: any) {
      setError(err.message);

    } finally {
      setLoading(false);
    }
  }


  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-950 to-blue-950 text-white p-8">

      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-8">

          <div className="text-6xl mb-4">
            📝
          </div>

          <h1 className="text-5xl font-black">
            Register Customer
          </h1>

          <p className="text-gray-400 mt-3">
            Add new customer to Nexus Guardian AI
          </p>

        </div>


        <div className="bg-white/5 backdrop-blur-md border border-cyan-500/30 p-8 rounded-3xl">

          {message && (
            <div className="bg-green-900 text-green-300 p-4 rounded mb-4">
              {message}
            </div>
          )}


          {error && (
            <div className="bg-red-900 text-red-300 p-4 rounded mb-4">
              {error}
            </div>
          )}


          <div className="space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={form.fullName}
              onChange={(e) =>
                setForm({
                  ...form,
                  fullName: e.target.value,
                })
              }
              className="w-full p-4 rounded-lg text-black"
            />


            <input
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={(e) =>
                setForm({
                  ...form,
                  email: e.target.value,
                })
              }
              className="w-full p-4 rounded-lg bg-white text-black placeholder-gray-500"
            />


            <input
              type="text"
              placeholder="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({
                  ...form,
                  phone: e.target.value,
                })
              }
              className="w-full p-4 rounded-lg text-black"
            />


            <select
              value={form.kycStatus}
              onChange={(e) =>
                setForm({
                  ...form,
                  kycStatus: e.target.value,
                })
              }
              className="w-full p-4 rounded-lg text-black"
            >
              <option value="pending">
                Pending KYC
              </option>

              <option value="verified">
                Verified KYC
              </option>

              <option value="rejected">
                Rejected KYC
              </option>

            </select>


            <button
              onClick={registerCustomer}
              disabled={loading}
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold p-4 rounded-lg"
            >
              {
                loading
                ? "Registering Customer..."
                : "Register Customer"
              }
            </button>

          </div>

        </div>

      </div>

    </main>
  );
}