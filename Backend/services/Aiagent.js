import { RoomServiceClient } from "livekit-server-sdk";
import OpenAI from "openai";
import dotenv from "dotenv";
import HelpRequest from "../models/HelpRequest.js";

dotenv.config();

const { LIVEKIT_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET, OPENAI_API_KEY } = process.env;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

export const startAIAgent = async () => {
  console.log("🤖 Starting LiveKit AI Agent for Telephony...");

  const livekit = new RoomServiceClient(
    LIVEKIT_URL.replace("wss://", "https://"),
    LIVEKIT_API_KEY,
    LIVEKIT_API_SECRET
  );

  // Room for telephony session
  const roomName = "salon-telephony";
  await livekit.createRoom({ name: roomName });

  console.log(`📞 Listening for inbound calls in room: ${roomName}`);

  // When a call comes in via telephony, LiveKit auto-joins this room
  // Your AI logic remains same as before (OpenAI + MongoDB fallback)

  const handleCustomerInput = async (inputText) => {
    console.log("👂 Caller said:", inputText);
    let answer;

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a salon receptionist answering phone calls. Greet callers politely, answer concisely, and escalate to a supervisor when needed.",
          },
          { role: "user", content: inputText },
        ],
      });
      answer = response.choices[0].message.content;
    } catch (err) {
      answer = "Let me check with my supervisor and get back to you.";
    }

    console.log("🤖 AI:", answer);

    // Save to MongoDB if escalated
    if (answer.toLowerCase().includes("supervisor")) {
      await HelpRequest.create({
        customerName: "Phone Caller",
        question: inputText,
        status: "pending",
      });
      console.log("📨 Escalation logged for supervisor.");
    }

    return answer;
  };
};
