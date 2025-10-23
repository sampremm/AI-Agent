// Backend/models/KnowledgeBase.js
import mongoose from "mongoose";

const knowledgeBaseSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: "general",
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("KnowledgeBase", knowledgeBaseSchema);
