import { SiteMedia } from "../models/SiteMedia.js";
import { uploadBufferToCloudinary, deleteFromCloudinary } from "../config/cloudinary.js";

/**
 * Téléverse une image sur Cloudinary et crée ou met à jour l'entrée en base
 */
export const uploadAndSaveMedia = async ({ buffer, key, title, category, altText }) => {
  const normalizedKey = key ? key.trim().toLowerCase() : `media_${Date.now()}`;
  const folder = `cdeco/${category || "general"}`;

  // Envoi vers Cloudinary
  const uploadResult = await uploadBufferToCloudinary(buffer, folder, normalizedKey);

  // Recherche d'un média existant avec cette clé
  let media = await SiteMedia.findOne({ key: normalizedKey });

  if (media) {
    // Si l'ancien média avait un publicId différent, suppression de l'ancienne ressource
    if (media.publicId && media.publicId !== uploadResult.publicId) {
      await deleteFromCloudinary(media.publicId);
    }

    media.url = uploadResult.secureUrl;
    media.publicId = uploadResult.publicId;
    if (title) media.title = title;
    if (category) media.category = category;
    if (altText) media.altText = altText;
    await media.save();
  } else {
    media = new SiteMedia({
      key: normalizedKey,
      title: title || normalizedKey,
      category: category || "general",
      url: uploadResult.secureUrl,
      publicId: uploadResult.publicId,
      altText: altText || "Illustration CDECO",
      isActive: true,
    });
    await media.save();
  }

  return media;
};

/**
 * Récupère tous les médias ou filtre par catégorie
 */
export const getMediaList = async (category) => {
  const filter = { isActive: true };
  if (category) {
    filter.category = category;
  }
  return await SiteMedia.find(filter).sort({ order: 1, createdAt: -1 }).lean();
};

/**
 * Récupère un dictionnaire clé -> URL de tous les médias pour le frontend
 */
export const getMediaDictionary = async () => {
  const medias = await SiteMedia.find({ isActive: true }).lean();
  const dictionary = {};
  for (const m of medias) {
    dictionary[m.key] = m.url;
  }
  return dictionary;
};

/**
 * Supprime un média de la base et de Cloudinary
 */
export const deleteMediaById = async (id) => {
  const media = await SiteMedia.findById(id);
  if (!media) {
    const error = new Error("Média introuvable.");
    error.statusCode = 404;
    throw error;
  }

  if (media.publicId) {
    await deleteFromCloudinary(media.publicId);
  }

  await SiteMedia.findByIdAndDelete(id);
  return { message: "Média supprimé avec succès." };
};

