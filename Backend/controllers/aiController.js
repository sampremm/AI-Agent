// Backend/controllers/aiController.js
import { generateRoomToken } from "../services/livekitService.js";
import { startAIAgent } from "../services/Aiagent.js";

export const handleIncomingCall = async (req, res) => {
  const { customerName, roomName } = req.body;

  try {
    const token = await generateRoomToken(
      customerName || "guest",
      roomName || "salon-room"
    );

    if (!token || typeof token !== "string") {
      console.error("❌ Invalid LiveKit token:", token);
      return res.status(500).json({ message: "Failed to generate LiveKit token" });
    }

    // ✅ Start AI agent (runs once per session)
    startAIAgent();

    // ✅ Return token as a string, not object
    res.json({
      message: "AI Agent joining the call...",
      token: String(token),
      room: roomName || "salon-room",
      identity: customerName || "guest",
    });
  } catch (error) {
    console.error("❌ Error handling call:", error.message);
    res.status(500).json({ message: "Failed to connect AI agent" });
  }
};
