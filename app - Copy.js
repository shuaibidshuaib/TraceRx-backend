// app.js
const express = require("express");
const { Client, AccountId, PrivateKey } = require("@hashgraph/sdk");
const { admin, db } = require("./firebase/admin"); // your Firebase setup

const app = express();
const PORT = 3000;

app.use(express.json());

// ---------------- Firebase Test ----------------
app.get("/test-firestore", async (req, res) => {
  try {
    const docRef = db.collection("test").doc("hello");
    await docRef.set({ message: "Hello from Firestore!" });
    const docSnap = await docRef.get();
    res.send({ firestore: docSnap.data() });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to Firestore");
  }
});

// ---------------- Hedera Test ----------------
app.get("/test-hedera", async (req, res) => {
  try {
    // Replace these with your Hedera testnet account ID & private key
    const myAccountId = AccountId.fromString("0.0.6519209");
    const myPrivateKey = PrivateKey.fromString("0x6ba6ad73a002994df73118024eb9ae6e8e484e641627f5e2c0401d7ff19c7d01");

    const client = Client.forTestnet();
    client.setOperator(myAccountId, myPrivateKey);

    const balance = await client.getAccountBalance(myAccountId);
    res.send({ hedera: { balance: balance.hbars.toString() + " HBAR" } });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error connecting to Hedera");
  }
});

// Simple root route
app.get("/", (req, res) => {
  res.send("Backend is running! ✅ Firebase & Hedera ready to test");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
