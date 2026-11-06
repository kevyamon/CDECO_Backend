import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { ROLES } from "../constants/roles.js";

/**
 * Vérifie la présence et la validité du jeton JWT
 */
export const verifyToken = (req, res, next) => {
  try {
    let token = null;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.accessToken) {
      token = req.cookies.accessToken;
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentification requise. Jeton d'accès manquant.",
      });
    }

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Session expirée ou jeton d'accès invalide. Veuillez vous reconnecter.",
    });
  }
};

/**
 * Restreint l'accès aux utilisateurs ayant le rôle administrateur
 */
export const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== ROLES.ADMIN) {
    return res.status(403).json({
      success: false,
      message: "Accès refusé. Cette ressource est strictement réservée aux administrateurs.",
    });
  }
  next();
};

