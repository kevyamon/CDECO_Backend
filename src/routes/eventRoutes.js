import express from "express";
import {
  listEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Routes publiques pour consulter les événements
router.get("/", listEvents);
router.get("/:id", getEventById);

// Routes d'administration pour la gestion complète
router.post("/", verifyToken, requireAdmin, createEvent);
router.put("/:id", verifyToken, requireAdmin, updateEvent);
router.delete("/:id", verifyToken, requireAdmin, deleteEvent);

export default router;

