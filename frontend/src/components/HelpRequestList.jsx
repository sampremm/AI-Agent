import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/supervisor";

export default function HelpRequestList() {
  const [requests, setRequests] = useState([]);
  const [response, setResponse] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    try {
      const res = await axios.get(`${API_URL}/pending`);
      setRequests(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch pending:", err);
    }
  };

  const sendResponse = async (id) => {
    try {
      await axios.post(`${API_URL}/respond/${id}`, { response });
      setResponse("");
      setSelectedId(null);
      fetchPending();
      alert("✅ Response sent successfully!");
    } catch (err) {
      console.error("❌ Failed to send response:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">🕓 Pending Requests</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500">No pending requests 🎉</p>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req._id} className="border p-4 rounded-xl">
              <p className="text-gray-800 font-medium">{req.customerName}</p>
              <p className="text-gray-600 italic mb-2">"{req.question}"</p>

              {selectedId === req._id ? (
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    placeholder="Type your response..."
                    className="flex-1 border p-2 rounded-md focus:outline-blue-500"
                  />
                  <button
                    onClick={() => sendResponse(req._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                  >
                    Send
                  </button>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="text-gray-500 hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setSelectedId(req._id)}
                  className="mt-2 bg-gray-100 hover:bg-gray-200 text-blue-600 px-3 py-1 rounded-md"
                >
                  Respond
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
