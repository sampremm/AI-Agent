import { AccessToken } from "livekit-server-sdk";
import dotenv from "dotenv";
dotenv.config();

const { LIVEKIT_API_KEY, LIVEKIT_API_SECRET } = process.env;

// Generate a token so the React frontend can join the same room
export const generateRoomToken = async (req, res) => {
  try {
    const identity = "guest-" + Math.floor(Math.random() * 10000);
    const roomName = "salon-room"; // must match your AI agent’s room

    const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, {
      identity,
    });

    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    const token = at.toJwt();
    res.json({ token, room: roomName, identity });
  } catch (err) {
    console.error("❌ Token generation error:", err.message);
    res.status(500).json({ message: "Failed to generate LiveKit token" });
  }
};
