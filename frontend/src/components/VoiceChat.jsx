import { useEffect, useState, useRef } from "react";
import * as livekit from "livekit-client"; // ✅ Import correctly

const VoiceChat = () => {
  const [userTranscript, setUserTranscript] = useState("");
  const [aiTranscript, setAiTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [connected, setConnected] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    const joinRoom = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/livekit/token`);
        const data = await response.json();

        if (!data.token) {
          console.error("❌ No token received:", data);
          return;
        }

        // ✅ Use new import style
        const room = await livekit.connect(import.meta.env.VITE_LIVEKIT_URL, data.token, {
          audio: true,
          video: false,
        });

        setConnected(true);
        console.log(`🎧 Connected to room: ${data.room}`);

        room.on(livekit.RoomEvent.TrackSubscribed, (track, publication, participant) => {
          if (track.kind === livekit.Track.Kind.Audio) {
            const audioEl = track.attach();
            audioEl.play();
          }
        });

        room.on(livekit.RoomEvent.Disconnected, () => setConnected(false));
      } catch (error) {
        console.error("❌ Error connecting to room:", error);
      }
    };

    joinRoom();
  }, []);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
      setUserTranscript("");
    };

    recognition.onresult = async (event) => {
      const text = event.results[0][0].transcript;
      setUserTranscript(text);
      console.log("🗣️ You said:", text);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/ai/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      const result = await res.json();
      setAiTranscript(result.reply || "🤖 (AI didn’t respond)");
    };

    recognition.onerror = (event) => console.error("Speech recognition error:", event);
    recognition.onend = () => setIsListening(false);

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setIsListening(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <h1 className="text-3xl font-semibold mb-6">🎙️ Talk to Salon AI</h1>

      {connected ? (
        <div className="bg-gray-800 p-6 rounded-xl shadow-md w-96 text-center">
          <p className="text-sm text-gray-400 mb-2">
            {isListening ? "Listening..." : "Click the mic to talk"}
          </p>

          <button
            onClick={isListening ? stopListening : startListening}
            className={`${
              isListening ? "bg-red-500" : "bg-blue-500"
            } text-white px-6 py-3 rounded-full text-lg font-medium shadow-md transition`}
          >
            {isListening ? "Stop 🎙️" : "Start Talking"}
          </button>

          <div className="mt-6 text-left">
            <p className="text-gray-400 text-sm">You said:</p>
            <p className="text-lg font-semibold mb-4">{userTranscript}</p>

            <p className="text-gray-400 text-sm">AI replied:</p>
            <p className="text-lg font-semibold text-green-400">{aiTranscript}</p>
          </div>
        </div>
      ) : (
        <p className="text-gray-400">Connecting to AI agent...</p>
      )}
    </div>
  );
};

export default VoiceChat;
