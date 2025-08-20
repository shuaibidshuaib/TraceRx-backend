const { Client, AccountId, PrivateKey, AccountBalanceQuery } = require("@hashgraph/sdk");

const operatorId = AccountId.fromString("0.0.6519209");
const operatorKey = PrivateKey.fromStringECDSA("0x6ba6ad73a002994df73118024eb9ae6e8e484e641627f5e2c0401d7ff19c7d01");

const client = Client.forTestnet().setOperator(operatorId, operatorKey);

async function checkNetwork() {
  try {
    const balance = await new AccountBalanceQuery()
      .setAccountId(operatorId)
      .execute(client);

    console.log("Network check successful. Account balance:", balance.hbars.toString());
  } catch (err) {
    console.error("Network check failed:", err.message);
  }
}

checkNetwork().then(() => process.exit(0));
