import express from "express";
import {
  submitContact,
  listMessages,
  toggleReadStatus,
  removeMessage,
} from "../controllers/contactController.js";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware.js";
import { formLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Route publique
router.post("/", formLimiter, submitContact);

// Routes d'administration
router.get("/", verifyToken, requireAdmin, listMessages);
router.patch("/:id/read", verifyToken, requireAdmin, toggleReadStatus);
router.delete("/:id", verifyToken, requireAdmin, removeMessage);

export default router;

