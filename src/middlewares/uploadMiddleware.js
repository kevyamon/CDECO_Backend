import multer from "multer";

// Stockage en mémoire RAM pour transmission immédiate vers Cloudinary sans écriture disque
const storage = multer.memoryStorage();

// Filtrage strict des types MIME autorisés
const fileFilter = (req, file, cb) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
    "image/gif",
    "image/svg+xml",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Format de fichier non pris en charge. Seuls les formats JPEG, PNG, WEBP, GIF et SVG sont acceptés."
      ),
      false
    );
  }
};

export const uploadSingleImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // Limite à 10 Mo
  },
}).single("image");

