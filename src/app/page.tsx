export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center max-w-3xl px-6">
        <h1 className="text-5xl font-bold mb-6">
          Nexus Guardian
        </h1>

        <p className="text-xl text-gray-300 mb-8">
          AI-powered Trust Agent for Autonomous KYC Verification,
          Fraud Detection, and Risk Investigation.
        </p>

        <div className="space-y-3">
          <p>🧠 Gemini AI Agent</p>
          <p>🔒 Digital Trust & Fraud Prevention</p>
          <p>🗄️ MongoDB MCP Integration</p>
          <p>⚡ Human-in-the-loop Decision Making</p>
        </div>

        <button className="mt-10 px-6 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">
          Start Investigation
        </button>
      </div>
    </main>
  );
}