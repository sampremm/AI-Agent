// Backend/services/livekitService.js
import { AccessToken } from "livekit-server-sdk";
import dotenv from "dotenv";

dotenv.config();

const { LIVEKIT_API_KEY, LIVEKIT_API_SECRET } = process.env;

/**
 * Generates a valid LiveKit JWT token for a given user/room
 */
export const generateRoomToken = async (identity = "guest", roomName = "salon-room") => {
  try {
    console.log("🔑 LIVEKIT_API_KEY:", LIVEKIT_API_KEY);
    console.log("🔒 LIVEKIT_API_SECRET exists:", !!LIVEKIT_API_SECRET);

    if (!LIVEKIT_API_KEY || !LIVEKIT_API_SECRET) {
      throw new Error("Missing LiveKit credentials");
    }

    // 🧠 Create token instance
    const at = new AccessToken(LIVEKIT_API_KEY, LIVEKIT_API_SECRET, { identity });

    // 🛠️ Grant permissions
    at.addGrant({
      roomJoin: true,
      room: roomName,
      canPublish: true,
      canSubscribe: true,
    });

    // ✅ Convert to JWT string (must await)
    const jwt = await at.toJwt();

    console.log("✅ Token generated successfully:", jwt.substring(0, 30) + "...");
    return jwt;
  } catch (err) {
    console.error("❌ Error generating LiveKit token:", err.message);
    return null;
  }
};
