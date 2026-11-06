import dotenv from "dotenv";

dotenv.config();

export const ENV = Object.freeze({
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  CLIENT_URL: process.env.FRONTEND_URL || process.env.CLIENT_URL || "http://localhost:5173",
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/cdeco",
  JWT_SECRET: process.env.JWT_SECRET || "cdeco_default_dev_secret_key_change_in_production",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "cdeco_default_dev_refresh_key_change_in_production",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
  AD_ID: process.env.AD_ID || "admin@cdeco.org",
  AD_PW: process.env.AD_PW || "AdminCdeco2026!Securise",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
});

