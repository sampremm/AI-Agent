import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3000/api/supervisor";

export default function LearnedAnswers() {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    fetchLearned();
  }, []);

  const fetchLearned = async () => {
    try {
      const res = await axios.get(`${API_URL}/learned`);
      setAnswers(res.data);
    } catch (err) {
      console.error("❌ Failed to fetch learned:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📚 Learned Answers</h2>

      {answers.length === 0 ? (
        <p className="text-gray-500">No learned answers yet.</p>
      ) : (
        <div className="space-y-4">
          {answers.map((ans) => (
            <div key={ans._id} className="border p-4 rounded-xl">
              <p className="font-medium text-gray-800">{ans.customerName}</p>
              <p className="italic text-gray-600 mb-2">Q: {ans.question}</p>
              <p className="text-green-600 font-semibold">A: {ans.supervisorResponse}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
