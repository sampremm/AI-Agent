import express from "express";
import {
  getPendingRequests,
  respondToRequest,
  getLearnedAnswers,
} from "../controllers/supervisorController.js";

const router = express.Router();

// Get all pending help requests
router.get("/pending", getPendingRequests);

// Supervisor responds to a pending request
router.post("/respond/:id", respondToRequest);

// Get all learned answers (responses saved)
router.get("/learned", getLearnedAnswers);

export default router;
