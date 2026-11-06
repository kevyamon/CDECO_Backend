import rateLimit from "express-rate-limit";

/**
 * Limiteur global d'API
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // Limite à 300 requêtes par fenêtre
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Trop de requêtes effectuées depuis cette adresse IP. Réessayez dans quelques minutes.",
  },
});

/**
 * Limiteur spécifique pour l'authentification (brute-force protection)
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 15, // 15 tentatives par 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Nombre maximal de tentatives de connexion dépassé. Patientez 15 minutes avant de réessayer.",
  },
});

/**
 * Limiteur pour les formulaires publics (spam protection)
 */
export const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 20, // 20 soumissions par heure
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Trop de soumissions de formulaires depuis votre adresse IP. Merci de patienter.",
  },
});

