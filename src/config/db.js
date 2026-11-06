import mongoose from "mongoose";
import { ENV } from "./env.js";

/**
 * Initialise la connexion à MongoDB Atlas avec gestion des événements
 */
export const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("[MongoDB] Connexion établie avec succès à la base de données.");
    });

    mongoose.connection.on("error", (err) => {
      console.error("[MongoDB] Erreur de connexion :", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.warn("[MongoDB] Déconnexion détectée.");
    });

    await mongoose.connect(ENV.MONGODB_URI, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000,
    });
  } catch (error) {
    console.error("[MongoDB] Échec critique de connexion à MongoDB Atlas :", error.message);
    console.info("[MongoDB] Le serveur démarre en mode résilient. Vérifiez votre chaîne MONGODB_URI.");
  }
};

