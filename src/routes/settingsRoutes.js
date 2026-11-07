import express from "express";
import { getContactSettings, updateContactSettings } from "../controllers/settingsController.js";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/contact", getContactSettings);
router.put("/contact", verifyToken, requireAdmin, updateContactSettings);

export default router;

