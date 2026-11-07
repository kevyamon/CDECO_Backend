import Resource from "../models/Resource.js";
import { seedInitialData } from "../services/seedService.js";

// Liste toutes les ressources officielles (Public / Admin)
export const listResources = async (req, res) => {
  try {
    const { category } = req.query;

    // Si la collection est vide, amorcer avec les documents officiels par défaut
    const totalCount = await Resource.countDocuments();
    if (totalCount === 0) {
      await seedInitialData();
    }

    const filter = { isActive: true };
    if (category) {
      filter.category = category;
    }

    const resources = await Resource.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: resources.length, data: resources });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur lors de la récupération des ressources.", error: error.message });
  }
};

// Création d'une nouvelle ressource (Admin)
export const createResource = async (req, res) => {
  try {
    const { title, titleEn, description, descriptionEn, fileUrl, fileSize, category, order } = req.body;
    if (!title || !fileUrl) {
      return res.status(400).json({ success: false, message: "Le titre et le fichier sont obligatoires." });
    }

    const resource = await Resource.create({
      title,
      titleEn: titleEn || title,
      description: description || "",
      descriptionEn: descriptionEn || "",
      fileUrl,
      fileSize: fileSize || "PDF",
      category: category || "guide",
      order: order !== undefined ? Number(order) : 0,
      isActive: true,
    });

    res.status(201).json({ success: true, message: "Document publié avec succès.", data: resource });
  } catch (error) {
    res.status(500).json({ success: false, message: "Échec de création du document.", error: error.message });
  }
};

// Mise à jour d'une ressource (Admin)
export const updateResource = async (req, res) => {
  try {
    const { id } = req.params;
    const resource = await Resource.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!resource) {
      return res.status(404).json({ success: false, message: "Document introuvable." });
    }
    res.status(200).json({ success: true, message: "Document mis à jour.", data: resource });
  } catch (error) {
    res.status(500).json({ success: false, message: "Échec de mise à jour.", error: error.message });
  }
};

// Suppression d'une ressource (Admin)
export const deleteResource = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Resource.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Document introuvable." });
    }
    res.status(200).json({ success: true, message: "Document retiré avec succès." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Échec de suppression.", error: error.message });
  }
};
