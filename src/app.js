import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { ENV } from "./config/env.js";
import { globalLimiter } from "./middlewares/rateLimiter.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import apiRouter from "./routes/index.js";

const app = express();

// Configuration du reverse proxy (Render, Cloudflare, etc.) pour identifier la véritable IP client
app.set("trust proxy", 1);

// Configuration des en-têtes HTTP de sécurité
app.use(helmet());

// Configuration stricte de CORS
const allowedOrigins = [
  ENV.CLIENT_URL,
  process.env.FRONTEND_URL,
  process.env.CLIENT_URL,
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Autoriser les requêtes sans origine (comme Postman ou curl) en dev
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origine CORS non autorisée : ${origin}`));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Limiteur de débit global
app.use(globalLimiter);

// Parseurs de requêtes
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// Montage des routes d'API
app.use("/api", apiRouter);

// Gestion des routes inconnues (404)
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `La route demandée '${req.originalUrl}' n'existe pas sur cette API.`,
  });
});

// Middleware centralisé de capture des erreurs
app.use(errorHandler);

export default app;

