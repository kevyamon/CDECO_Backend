import { loginUser, refreshAccessToken } from "../services/authService.js";
import { loginSchema } from "../validations/authValidation.js";
import { ENV } from "../config/env.js";

/**
 * Connexion administrateur ou membre
 */
export const login = async (req, res, next) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { user, tokens } = await loginUser(validatedData.email, validatedData.password);

    // Stockage sécurisé du Refresh Token en cookie HTTP-Only
    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 jours
    });

    return res.status(200).json({
      success: true,
      message: "Connexion réussie.",
      user,
      accessToken: tokens.accessToken,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Renouvellement du jeton d'accès
 */
export const refresh = async (req, res, next) => {
  try {
    const refreshToken = req.cookies.refreshToken || req.body.refreshToken;
    const { user, tokens } = await refreshAccessToken(refreshToken);

    res.cookie("refreshToken", tokens.refreshToken, {
      httpOnly: true,
      secure: ENV.NODE_ENV === "production",
      sameSite: ENV.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      accessToken: tokens.accessToken,
      user,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Déconnexion avec suppression du cookie
 */
export const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: ENV.NODE_ENV === "production",
    sameSite: ENV.NODE_ENV === "production" ? "strict" : "lax",
  });

  return res.status(200).json({
    success: true,
    message: "Déconnexion effectuée avec succès.",
  });
};

/**
 * Retourne le profil de l'utilisateur connecté
 */
export const getMe = (req, res) => {
  return res.status(200).json({
    success: true,
    user: req.user,
  });
};

