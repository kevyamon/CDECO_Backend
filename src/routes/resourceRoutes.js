import express from "express";
import { listResources, createResource, updateResource, deleteResource } from "../controllers/resourceController.js";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", listResources);
router.post("/", verifyToken, requireAdmin, createResource);
router.put("/:id", verifyToken, requireAdmin, updateResource);
router.delete("/:id", verifyToken, requireAdmin, deleteResource);

export default router;

