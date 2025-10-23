import express from "express";
import { AccessToken } from "livekit-server-sdk";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const { LIVEKIT_API_KEY, LIVEKIT_API_SECRET } = process.env;

router.get("/token", (req, res) => {
  try {
    const identity = "guest";
    const roomName = "salon-room";

    const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, { identity });
    at.addGrant({ roomJoin: true, room: roomName });

    const token = at.toJwt();
    res.json({ token, room: roomName, identity });
  } catch (err) {
    console.error("❌ Error generating LiveKit token:", err);
    res.status(500).json({ message: "Failed to generate LiveKit token" });
  }
});

export default router;
