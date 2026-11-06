import express from "express";
import {
  submitMembership,
  listMemberships,
  changeMembershipStatus,
  removeMembership,
  getStats,
} from "../controllers/membershipController.js";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware.js";
import { formLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

// Route publique
router.post("/", formLimiter, submitMembership);

// Routes protégées réservées à l'administrateur
router.get("/", verifyToken, requireAdmin, listMemberships);
router.get("/stats", verifyToken, requireAdmin, getStats);
router.patch("/:id/status", verifyToken, requireAdmin, changeMembershipStatus);
router.delete("/:id", verifyToken, requireAdmin, removeMembership);

export default router;

