import Link from "next/link";

import WalletStatus from "../components/WalletStatus";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-black/80 backdrop-blur-lg border-b border-cyan-500/20">
        <div className="flex justify-between items-center px-8 py-4">

          <div className="flex items-center gap-3">
            <div className="text-3xl">🛡️</div>

            <h1 className="text-2xl font-bold">
              Nexus Guardian
              <span className="text-cyan-400"> AI</span>
            </h1>
          </div>


          <div className="hidden md:flex gap-8 text-gray-300">
            <Link href="/">🏠 Home</Link>
            <Link href="/register">👥 Customers</Link>
            <Link href="/investigation">🔎 Investigation</Link>
            <Link href="/dashboard">📊 Dashboard</Link>
            <Link href="/history">📜 Audit</Link>
          </div>


          <WalletStatus />

        </div>
      </nav>


      {/* Content */}
      <div className="p-4 flex flex-col items-center">

        <h1 className="text-5xl font-black mb-3 text-center">
          Nexus Guardian
        </h1>

        <p className="text-lg text-center max-w-3xl mb-5 text-gray-300">
          AI-powered Trust Agent for Autonomous KYC Verification,
          Fraud Detection, and Risk Investigation.
        </p>


        {/* Features */}
        <div className="space-y-2 text-base text-center mb-6">

          <p>🧠 Gemini AI Agent</p>
          <p>🔐 Digital Trust & Fraud Prevention</p>
          <p>🗄️ MongoDB Intelligence Layer</p>
          <p>⚡ Human-in-the-loop Decision Making</p>

        </div>


        {/* Cards */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl">

          <Link
            href="/register"
            className="bg-cyan-600 hover:bg-cyan-500 p-4 rounded-xl text-center">

            <div className="text-4xl mb-2">📝</div>

            <h2 className="font-bold">
              Register Customer
            </h2>

            <p className="text-sm mt-2">
              Add new customer to trust network
            </p>

          </Link>


          <Link
            href="/investigation"
            className="bg-blue-600 hover:bg-blue-500 p-4 rounded-xl text-center">

            <div className="text-4xl mb-2">🧠</div>

            <h2 className="font-bold">
              AI Investigation
            </h2>

            <p className="text-sm mt-2">
              Launch Gemini fraud analysis
            </p>

          </Link>


          <Link
            href="/dashboard"
            className="bg-purple-600 hover:bg-purple-500 p-4 rounded-xl text-center">

            <div className="text-4xl mb-2">📊</div>

            <h2 className="font-bold">
              Dashboard
            </h2>

            <p className="text-sm mt-2">
              View security analytics
            </p>

          </Link>


          <Link
            href="/history"
            className="bg-green-600 hover:bg-green-500 p-4 rounded-xl text-center">

            <div className="text-4xl mb-2">📜</div>

            <h2 className="font-bold">
              Audit History
            </h2>

            <p className="text-sm mt-2">
              Review AI decisions
            </p>

             </Link>

              <Link
                 href="/security"
                    className="bg-red-600 hover:bg-red-500 p-4 rounded-xl text-center"
>
            <div className="text-4xl mb-2">
                    🛡️
             </div>

            <h2 className="font-bold">
                 Security Center
           </h2>

             <p className="text-sm mt-2">
    Web3 AI Risk Analytics
             </p>

         </Link>
         
         <Link
               href="/wallet-history"
                      className="bg-orange-600 hover:bg-orange-500 p-4 rounded-xl text-center"
>

          <div className="text-4xl mb-2">
                      👛
         </div>
                <h2 className="font-bold">
                    Wallet Intelligence
                </h2>
              <p className="text-sm mt-2">
                    Blockchain audit history
               </p>
         </Link>

        </div>

        {/* Footer */}
        <div className="mt-8 text-gray-500 text-sm text-center">

          Powered by Gemini 2.5 Flash • MongoDB Atlas • Mantle Network

        </div>

      </div>

    </main>
  );
}