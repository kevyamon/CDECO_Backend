import app from "./app.js";
import { connectDB } from "./config/db.js";
import { ENV } from "./config/env.js";
import { bootstrapAdmin } from "./services/authService.js";

/**
 * Démarrage du serveur et amorçage des services
 */
const startServer = async () => {
  try {
    // Connexion à la base de données MongoDB Atlas
    await connectDB();

    // Amorçage automatique du compte administrateur si nécessaire
    await bootstrapAdmin();

    const server = app.listen(ENV.PORT, () => {
      console.log("==================================================================");
      console.log(`[CDECO API] Serveur démarré avec succès en mode ${ENV.NODE_ENV}`);
      console.log(`[CDECO API] Port d'écoute : http://localhost:${ENV.PORT}`);
      console.log(`[CDECO API] Health Check : http://localhost:${ENV.PORT}/api/health`);
      console.log(`[CDECO API] Origine autorisée (Client) : ${ENV.CLIENT_URL}`);
      console.log(`[CDECO API] Compte Admin amorcé : ${ENV.AD_ID}`);
      console.log("==================================================================");
    });

    // Arrêt gracieux du serveur
    const shutdown = async (signal) => {
      console.log(`\n[CDECO API] Signal ${signal} reçu. Fermeture gracieuse...`);
      server.close(() => {
        console.log("[CDECO API] Serveur HTTP fermé.");
        process.exit(0);
      });
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));
  } catch (error) {
    console.error("[CDECO API] Échec critique au démarrage :", error);
    process.exit(1);
  }
};

startServer();

