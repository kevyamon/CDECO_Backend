import rateLimit from "express-rate-limit";

/**
 * Normalise l'IP et l'identifiant pour constituer une clé composite robuste
 */
const getCompositeKey = (req) => {
  const identifier = (req.body?.email || req.body?.identifier || "anonymous")
    .toLowerCase()
    .trim();
  const ip = req.ip || req.headers["x-forwarded-for"] || "127.0.0.1";
  return `${identifier}_${ip}`;
};

/**
 * Calcul du temps restant avant réinitialisation (en secondes)
 */
const getRetryAfterSeconds = (req) => {
  if (req.rateLimit?.resetTime) {
    const diff = Math.ceil((req.rateLimit.resetTime.getTime() - Date.now()) / 1000);
    return Math.max(diff, 1);
  }
  return 900;
};

/**
 * Limiteur global d'API (Protection volumétrique générale)
 */
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 500, // 500 requêtes par 15 min
  standardHeaders: "draft-7",
  legacyHeaders: false,
  validate: { trustProxy: false },
  message: {
    success: false,
    code: "GLOBAL_RATE_LIMIT",
    message: "Volume inhabituel de requêtes. Veuillez patienter quelques instants.",
  },
});

/**
 * Niveau 1 (Bancaire) : Protection ciblée par compte + IP
 * - Ne sanctionne QUE les échecs consécutifs sur un compte donné.
 * - `skipSuccessfulRequests: true` : Une connexion réussie ne décrémente JAMAIS le quota.
 * - N'affecte PAS les autres utilisateurs partageant la même IP (ex: 4G/WiFi d'entreprise).
 */
export const accountLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Fenêtre glissante de 15 minutes
  max: 5, // 5 échecs consécutifs autorisés avant verrouillage temporaire
  skipSuccessfulRequests: true, // Zéro pénalité en cas d'identifiants valides
  standardHeaders: "draft-7",
  legacyHeaders: false,
  validate: { trustProxy: false },
  keyGenerator: (req) => `acc_${getCompositeKey(req)}`,
  handler: (req, res) => {
    const retryAfter = getRetryAfterSeconds(req);
    const minutes = Math.ceil(retryAfter / 60);
    return res.status(429).json({
      success: false,
      code: "ACCOUNT_LOCKED_TEMPORARILY",
      message: `Protection bancaire : Trop de tentatives de connexion échouées pour ce compte. L'accès est temporairement verrouillé pendant ${minutes} minute(s) pour prévenir toute intrusion.`,
      retryAfter,
    });
  },
});

/**
 * Niveau 2 (Bancaire) : Protection anti-DDoS volumétrique par IP
 * - Plafond large (50 requêtes en échec / 15 min) pour tolérer les réseaux partagés (CGNAT).
 * - Bloque les attaques massives par dictionnaire automatisé.
 */
export const ipLoginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  skipSuccessfulRequests: true,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  validate: { trustProxy: false },
  keyGenerator: (req) => req.ip || req.headers["x-forwarded-for"] || "127.0.0.1",
  handler: (req, res) => {
    const retryAfter = getRetryAfterSeconds(req);
    const minutes = Math.ceil(retryAfter / 60);
    return res.status(429).json({
      success: false,
      code: "IP_RATE_LIMIT_EXCEEDED",
      message: `Sécurité réseau : Nombre d'essais anormalement élevé depuis ce réseau. Veuillez patienter ${minutes} minute(s).`,
      retryAfter,
    });
  },
});

/**
 * Limiteur bancaire combiné (IP + Compte) pour la route de connexion
 */
export const authLimiter = [ipLoginLimiter, accountLoginLimiter];

/**
 * Limiteur pour formulaires publics (Contact / Adhésion anti-spam)
 */
export const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 heure
  max: 25, // 25 soumissions par heure
  standardHeaders: "draft-7",
  legacyHeaders: false,
  validate: { trustProxy: false },
  message: {
    success: false,
    code: "FORM_SUBMISSION_LIMIT",
    message: "Nombre limite de soumissions atteint pour cette heure. Merci de réessayer plus tard.",
  },
});
