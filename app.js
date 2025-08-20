const express = require("express");
require("dotenv").config();
const cors = require("cors");
const drugRoutes = require("./routes/drug");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/drugs", drugRoutes);

// Health check route
app.get("/", (req, res) => {
  res.send("🚀 TraceRx backend is up and running!");
});

// Server listener
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ TraceRx backend running on port ${PORT}`);
});
