import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env.js";

// Configuration de l'instance Cloudinary
cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Téléverse un buffer binaire directement vers Cloudinary
 * @param {Buffer} buffer - Contenu du fichier
 * @param {string} folder - Dossier de destination Cloudinary (ex: "cdeco/medias")
 * @param {string} [publicId] - Identifiant personnalisé optionnel
 * @returns {Promise<{ url: string, secureUrl: string, publicId: string, format: string }>}
 */
export const uploadBufferToCloudinary = (buffer, folder = "cdeco", publicId = undefined) => {
  return new Promise((resolve, reject) => {
    if (!ENV.CLOUDINARY_CLOUD_NAME || !ENV.CLOUDINARY_API_KEY || !ENV.CLOUDINARY_API_SECRET) {
      return reject(new Error("Les clés Cloudinary ne sont pas configurées dans le fichier .env"));
    }

    const options = {
      folder,
      resource_type: "auto",
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    };

    if (publicId) {
      options.public_id = publicId;
      options.overwrite = true;
    }

    const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) return reject(error);
      resolve({
        url: result.url,
        secureUrl: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        width: result.width,
        height: result.height,
      });
    });

    uploadStream.end(buffer);
  });
};

/**
 * Supprime une ressource Cloudinary par son public_id
 * @param {string} publicId
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("[Cloudinary] Erreur lors de la suppression :", error.message);
  }
};

export default cloudinary;

