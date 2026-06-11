import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-8">

      <h1 className="text-6xl font-black mb-6 text-center">
        Nexus Guardian
      </h1>

      <p className="text-2xl text-center max-w-4xl mb-10">
        AI-powered Trust Agent for Autonomous KYC Verification,
        Fraud Detection, and Risk Investigation.
      </p>

      <div className="space-y-4 text-xl mb-12">

        <p>🧠 Gemini AI Agent</p>

        <p>🔐 Digital Trust & Fraud Prevention</p>

        <p>🗄️ MongoDB Intelligence Layer</p>

        <p>⚡ Human-in-the-loop Decision Making</p>

      </div>

      {/* Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 w-full max-w-6xl">

     <Link
      href="/register"
      className="bg-cyan-600 hover:bg-cyan-500 p-6 rounded-2xl text-center transition"
>
     <div className="text-5xl mb-3">
      📝
    </div>

    <h2 className="text-2xl font-bold">
      Register Customer
    </h2>

     <p className="mt-2 text-gray-200">
      Add new customer to the trust network
    </p>
     </Link>
        <Link
          href="/investigation"
          className="bg-blue-600 hover:bg-blue-500 p-6 rounded-2xl text-center transition"
        >
          <div className="text-5xl mb-3">
            🧠
          </div>

          <h2 className="text-2xl font-bold">
            AI Investigation
          </h2>

          <p className="mt-2 text-gray-200">
            Launch Gemini fraud investigation
          </p>
        </Link>


        <Link
          href="/dashboard"
          className="bg-purple-600 hover:bg-purple-500 p-6 rounded-2xl text-center transition"
        >
          <div className="text-5xl mb-3">
            📊
          </div>

          <h2 className="text-2xl font-bold">
            Executive Dashboard
          </h2>

          <p className="mt-2 text-gray-200">
            View AI security analytics
          </p>
        </Link>


        <Link
          href="/history"
          className="bg-green-600 hover:bg-green-500 p-6 rounded-2xl text-center transition"
        >
          <div className="text-5xl mb-3">
            📜
          </div>

          <h2 className="text-2xl font-bold">
            Audit History
          </h2>

          <p className="mt-2 text-gray-200">
            Review previous AI decisions
          </p>
        </Link>

      </div>


      <div className="mt-12 text-gray-500 text-center">
        Powered by Gemini 2.5 Flash • MongoDB Atlas • Next.js
      </div>

    </main>
  );
}