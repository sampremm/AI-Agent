import HelpRequest from "../models/HelpRequest.js";

// 📩 Get all pending help requests
export const getPendingRequests = async (req, res) => {
  try {
    const requests = await HelpRequest.find({ status: "pending" }).sort({ createdAt: -1 });
    res.json(requests);
  } catch (err) {
    console.error("❌ Error fetching pending requests:", err.message);
    res.status(500).json({ message: "Server error fetching pending requests" });
  }
};

// 💬 Supervisor responds to a request
export const respondToRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { response } = req.body;

    const helpReq = await HelpRequest.findById(id);
    if (!helpReq) return res.status(404).json({ message: "Help request not found" });

    helpReq.status = "resolved";
    helpReq.supervisorResponse = response;
    await helpReq.save();

    res.json({ message: "Response saved successfully", helpReq });
  } catch (err) {
    console.error("❌ Error responding to help request:", err.message);
    res.status(500).json({ message: "Failed to save supervisor response" });
  }
};

// 📚 Get all resolved (learned) help requests
export const getLearnedAnswers = async (req, res) => {
  try {
    const resolved = await HelpRequest.find({ status: "resolved" }).sort({ updatedAt: -1 });
    res.json(resolved);
  } catch (err) {
    console.error("❌ Error fetching learned answers:", err.message);
    res.status(500).json({ message: "Server error fetching learned answers" });
  }
};
