import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import aiRoutes from "./routes/aiRoutes.js";
import supervisorRoutes from "./routes/supervisorRoutes.js";
import livekitRoutes from "./routes/livekitRoutes.js"; // ✅ only once
import { startAIAgent } from "./services/Aiagent.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/api/ai", aiRoutes);
app.use("/api/supervisor", supervisorRoutes);
app.use("/api/livekit", livekitRoutes); // ✅ single usage

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Server running on ${process.env.PORT}`);
      startAIAgent(); // ✅ runs once
    });
  })
  .catch((err) => console.error("❌ Mongo Error:", err.message));
