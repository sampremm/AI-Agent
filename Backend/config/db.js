// Backend/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "./config/db.js";
import aiRoutes from "./routes/aiRoutes.js";
import { startAIAgent } from "./services/Aiagent.js";

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/ai", aiRoutes);

const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
  startAIAgent(); // Start the AI agent
});
