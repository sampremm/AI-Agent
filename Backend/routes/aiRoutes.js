import express from "express";
import { handleIncomingCall } from "../controllers/aiController.js";

const router = express.Router();
router.post("/call", handleIncomingCall);
export default router;
