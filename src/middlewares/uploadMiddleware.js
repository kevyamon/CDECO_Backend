import multer from "multer";

// Stockage en mémoire RAM pour transmission immédiate vers Cloudinary sans écriture disque
const storage = multer.memoryStorage();

// Filtrage des types MIME autorisés (images et vidéos)
const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith("image/");
  const isVideo = file.mimetype.startsWith("video/");

  if (isImage || isVideo) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Format de fichier non pris en charge. Seuls les formats image (JPEG, PNG, WEBP, SVG) et vidéo (MP4, WebM, MOV) sont acceptés."
      ),
      false
    );
  }
};

export const uploadSingleImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 50 * 1024 * 1024, // Limite à 50 Mo pour autoriser les courtes vidéos institutionnelles
  },
}).single("image");

