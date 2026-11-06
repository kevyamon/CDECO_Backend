import express from "express";
import {
  uploadMedia,
  listMedias,
  getDictionary,
  removeMedia,
} from "../controllers/mediaController.js";
import { verifyToken, requireAdmin } from "../middlewares/authMiddleware.js";
import { uploadSingleImage } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

// Routes publiques pour hydrater le frontend avec les images Cloudinary
router.get("/dictionary", getDictionary);
router.get("/", listMedias);

// Routes d'administration pour téléverser et gérer les médias
router.post("/upload", verifyToken, requireAdmin, uploadSingleImage, uploadMedia);
router.delete("/:id", verifyToken, requireAdmin, removeMedia);

export default router;

