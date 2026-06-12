export async function analyzeMantleWallet(
  wallet: string
) {

  // Temporary blockchain intelligence simulation

  const lastActivity = Math.floor(
    Math.random() * 100
  );

  const transactions = Math.floor(
    Math.random() * 500
  );


  return {
    wallet,

    network: "Mantle",

    transactions,

    lastActivityDays: lastActivity,

    riskSignals: transactions < 5 ? 2 : 0,
  };
}