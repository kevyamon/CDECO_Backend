import express from "express";
import authRoutes from "./authRoutes.js";
import membershipRoutes from "./membershipRoutes.js";
import contactRoutes from "./contactRoutes.js";
import mediaRoutes from "./mediaRoutes.js";
import eventRoutes from "./eventRoutes.js";
import settingsRoutes from "./settingsRoutes.js";
import memberRoutes from "./memberRoutes.js";
import resourceRoutes from "./resourceRoutes.js";

const apiRouter = express.Router();

// Route de vérification de santé
apiRouter.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    service: "CDECO REST API",
    version: "1.0.0",
  });
});

// Montage des routes modulaires
apiRouter.use("/auth", authRoutes);
apiRouter.use("/memberships", membershipRoutes);
apiRouter.use("/contact", contactRoutes);
apiRouter.use("/media", mediaRoutes);
apiRouter.use("/events", eventRoutes);
apiRouter.use("/settings", settingsRoutes);
apiRouter.use("/members", memberRoutes);
apiRouter.use("/resources", resourceRoutes);

export default apiRouter;

