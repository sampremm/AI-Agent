// Backend/models/HelpRequest.js
import mongoose from "mongoose";

const helpRequestSchema = new mongoose.Schema({
  customerName: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "resolved", "unresolved"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  resolvedAt: {
    type: Date,
  },
});

export default mongoose.model("HelpRequest", helpRequestSchema);
