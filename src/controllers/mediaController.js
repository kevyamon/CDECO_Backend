import {
  uploadAndSaveMedia,
  getMediaList,
  getMediaDictionary,
  deleteMediaById,
} from "../services/mediaService.js";

/**
 * Téléversement d'une image vers Cloudinary et enregistrement (Admin)
 */
export const uploadMedia = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Aucun fichier image n'a été fourni.",
      });
    }

    const { key, title, category, altText } = req.body;
    const media = await uploadAndSaveMedia({
      buffer: req.file.buffer,
      key,
      title,
      category,
      altText,
    });

    return res.status(201).json({
      success: true,
      message: "Image téléversée et configurée avec succès sur Cloudinary.",
      data: media,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère la liste des médias (Public / Admin)
 */
export const listMedias = async (req, res, next) => {
  try {
    const { category } = req.query;
    const medias = await getMediaList(category);

    return res.status(200).json({
      success: true,
      data: medias,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Récupère le dictionnaire des images actives (Public pour hydratation du site)
 */
export const getDictionary = async (req, res, next) => {
  try {
    const dictionary = await getMediaDictionary();
    return res.status(200).json({
      success: true,
      data: dictionary,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Supprime un média (Admin)
 */
export const removeMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteMediaById(id);

    return res.status(200).json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    next(error);
  }
};

