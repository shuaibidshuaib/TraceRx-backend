const {
  Client,
  TokenCreateTransaction,
  TokenType,
  TokenSupplyType,
  PrivateKey,
  AccountId
} = require("@hashgraph/sdk");
require("dotenv").config();

// Load operator credentials from .env
const operatorId = AccountId.fromString(process.env.OPERATOR_ID);
const operatorKey = PrivateKey.fromStringECDSA(process.env.OPERATOR_KEY); // ✅ Use ECDSA format

// Initialize Hedera client
const client = Client.forTestnet().setOperator(operatorId, operatorKey);

// Mint a fungible token for a drug batch
async function mintDrugToken(drugName, batchId) {
  try {
    const tokenCreateTx = new TokenCreateTransaction()
      .setTokenName(drugName)
      .setTokenSymbol(batchId.substring(0, 10))
      .setTokenType(TokenType.FungibleCommon)
      .setSupplyType(TokenSupplyType.Finite) // ✅ Required for maxSupply
      .setDecimals(0)
      .setInitialSupply(0)
      .setMaxSupply(1000000)
      .setTreasuryAccountId(operatorId)
      .freezeWith(client);

    const signTx = await tokenCreateTx.sign(operatorKey);
    const txResponse = await signTx.execute(client);
    const receipt = await txResponse.getReceipt(client);

    console.log("✅ Token minted successfully:", receipt.tokenId.toString());
  } catch (err) {
    console.error("❌ Token mint failed:", err);
  }
}

// Run the test
mintDrugToken("Paracetamol", "BATCH123456");
