import { ZodError } from "zod";

/**
 * Middleware centralisé de capture et traitement des erreurs
 */
export const errorHandler = (err, req, res, next) => {
  console.error(`[Error] ${req.method} ${req.url} -`, err.message || err);

  // Erreur de validation Zod
  if (err instanceof ZodError) {
    const formattedErrors = err.errors.map((e) => ({
      field: e.path.join("."),
      message: e.message,
    }));
    return res.status(400).json({
      success: false,
      message: "Erreur de validation des données transmises.",
      errors: formattedErrors,
    });
  }

  // Erreur de duplication MongoDB (code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || "champ";
    return res.status(409).json({
      success: false,
      message: `Un enregistrement avec cette valeur pour le champ '${field}' existe déjà.`,
    });
  }

  // Erreur de Cast MongoDB (identifiant invalide)
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      message: "Format d'identifiant invalide.",
    });
  }

  // Erreur de validation Mongoose
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((val) => val.message);
    return res.status(400).json({
      success: false,
      message: "Données non conformes au schéma.",
      errors: messages,
    });
  }

  // Erreurs JWT
  if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
    return res.status(401).json({
      success: false,
      message: "Jeton d'authentification invalide ou expiré.",
    });
  }

  // Erreur serveur par défaut
  const statusCode = err.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err.message || "Une erreur interne est survenue sur le serveur.",
  });
};

