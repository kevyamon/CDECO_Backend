import express from "express";
import { listMembers, createMember, updateMember, deleteMember } from "../controllers/memberController.js";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", listMembers);
router.post("/", verifyToken, requireAdmin, createMember);
router.put("/:id", verifyToken, requireAdmin, updateMember);
router.delete("/:id", verifyToken, requireAdmin, deleteMember);

export default router;

