import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import { ENV } from "../config/env.js";
import { ROLES } from "../constants/roles.js";

/**
 * Génère le couple de jetons d'accès et de rafraîchissement
 */
export const generateTokens = (user) => {
  const payload = {
    userId: user._id.toString(),
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(payload, ENV.JWT_SECRET, {
    expiresIn: ENV.JWT_EXPIRES_IN,
  });

  const refreshToken = jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
    expiresIn: ENV.JWT_REFRESH_EXPIRES_IN,
  });

  return { accessToken, refreshToken };
};

/**
 * Amorçage automatique du compte administrateur si inexistant
 */
export const bootstrapAdmin = async () => {
  try {
    const adminEmail = ENV.AD_ID.toLowerCase().trim();
    const existingAdmin = await User.findOne({ email: adminEmail });

    if (!existingAdmin) {
      console.log(`[Bootstrap] Création du compte administrateur initial (${adminEmail})...`);
      const newAdmin = new User({
        email: adminEmail,
        password: ENV.AD_PW,
        firstName: "Super",
        lastName: "Administrateur",
        role: ROLES.ADMIN,
        isActive: true,
      });

      await newAdmin.save();
      console.log(`[Bootstrap] Compte administrateur initial créé avec succès.`);
    } else {
      let needsSave = false;
      if (existingAdmin.role !== ROLES.ADMIN) {
        existingAdmin.role = ROLES.ADMIN;
        needsSave = true;
      }
      const isMatch = await existingAdmin.comparePassword(ENV.AD_PW);
      if (!isMatch) {
        existingAdmin.password = ENV.AD_PW;
        needsSave = true;
      }
      if (needsSave) {
        await existingAdmin.save();
        console.log(`[Bootstrap] Compte administrateur synchronisé avec succès.`);
      }
    }
  } catch (error) {
    console.error("[Bootstrap] Erreur lors de l'initialisation de l'administrateur :", error.message);
  }
};

/**
 * Authentification par email et mot de passe
 */
export const loginUser = async (email, password) => {
  const normalizedEmail = email.toLowerCase().trim();
  const user = await User.findOne({ email: normalizedEmail }).select("+password");

  if (!user) {
    const error = new Error("Identifiants incorrects. Veuillez vérifier votre adresse email et votre mot de passe.");
    error.statusCode = 401;
    throw error;
  }

  if (!user.isActive) {
    const error = new Error("Votre compte est désactivé. Veuillez contacter l'administration.");
    error.statusCode = 403;
    throw error;
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    const error = new Error("Identifiants incorrects. Veuillez vérifier votre adresse email et votre mot de passe.");
    error.statusCode = 401;
    throw error;
  }

  user.lastLogin = new Date();
  await user.save();

  const tokens = generateTokens(user);

  return {
    user: {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      lastLogin: user.lastLogin,
    },
    tokens,
  };
};

/**
 * Rafraîchit le jeton d'accès via le refresh token
 */
export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    const error = new Error("Jeton de rafraîchissement absent.");
    error.statusCode = 401;
    throw error;
  }

  const decoded = jwt.verify(refreshToken, ENV.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.userId).lean();

  if (!user || !user.isActive) {
    const error = new Error("Utilisateur introuvable ou compte désactivé.");
    error.statusCode = 401;
    throw error;
  }

  const newTokens = generateTokens(user);
  return { user, tokens: newTokens };
};

