const { Client, AccountBalanceQuery } = require("@hashgraph/sdk");

// Replace with your testnet account ID and private key
const operatorId = "0.0.6519209";
const operatorKey = "0x6ba6ad73a002994df73118024eb9ae6e8e484e641627f5e2c0401d7ff19c7d01";

async function main() {
    // Connect to Hedera testnet
    const client = Client.forTestnet();
    client.setOperator(operatorId, operatorKey);

    try {
        // Create a query for account balance
        const balance = await new AccountBalanceQuery()
            .setAccountId(operatorId)
            .execute(client);

        console.log("✅ Connected! Your HBAR balance is:", balance.hbars.toString());
    } catch (err) {
        console.error("❌ Hedera connection failed:", err);
    }
}

main();
