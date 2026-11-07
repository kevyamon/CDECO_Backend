import multer from "multer";

// Stockage en mémoire RAM pour transmission immédiate vers Cloudinary sans écriture disque
const storage = multer.memoryStorage();

// Filtrage des types MIME autorisés (images, vidéos et documents PDF)
const fileFilter = (req, file, cb) => {
  const isImage = file.mimetype.startsWith("image/");
  const isVideo = file.mimetype.startsWith("video/");
  const isPdf =
    file.mimetype === "application/pdf" ||
    file.mimetype.includes("pdf") ||
    file.originalname.toLowerCase().endsWith(".pdf");

  if (isImage || isVideo || isPdf) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Format de fichier non pris en charge. Seuls les formats image (JPEG, PNG, WEBP), vidéo (MP4, WebM) et documents PDF sont acceptés."
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

