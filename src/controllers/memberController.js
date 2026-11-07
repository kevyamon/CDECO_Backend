import Member from "../models/Member.js";
import { seedInitialData } from "../services/seedService.js";

// Helper pour formater un membre avec interopérabilité (category/type et description/bio)
const formatMember = (m) => {
  const doc = m.toObject ? m.toObject() : m;
  const category = doc.category || doc.type || "bureau";
  const description = doc.description || doc.bio || "";
  const descriptionEn = doc.descriptionEn || doc.bioEn || "";
  return {
    ...doc,
    category,
    type: category,
    description,
    bio: description,
    descriptionEn,
    bioEn: descriptionEn,
  };
};

// Liste tous les membres (public / admin)
export const listMembers = async (req, res) => {
  try {
    const { category, type } = req.query;
    const targetCategory = category || type;

    // Si la collection est vide, amorcer automatiquement avec les membres officiels
    const totalCount = await Member.countDocuments();
    if (totalCount === 0) {
      await seedInitialData();
    }

    const filter = { isActive: true };
    if (targetCategory) {
      filter.category = targetCategory;
    }

    const members = await Member.find(filter).sort({ order: 1, createdAt: 1 });
    const formatted = members.map(formatMember);

    res.status(200).json({ success: true, count: formatted.length, data: formatted });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur lors de la récupération des membres.", error: error.message });
  }
};

// Création d'un membre (Admin)
export const createMember = async (req, res) => {
  try {
    const { name, role, roleEn, category, type, roleColor, description, bio, descriptionEn, bioEn, image, order } = req.body;
    if (!name || !role) {
      return res.status(400).json({ success: false, message: "Le nom et le rôle sont obligatoires." });
    }

    const finalCategory = category || type || "bureau";
    const finalDesc = description !== undefined ? description : bio || "";
    const finalDescEn = descriptionEn !== undefined ? descriptionEn : bioEn || "";

    const member = await Member.create({
      name,
      role,
      roleEn: roleEn || role,
      category: finalCategory,
      roleColor: roleColor || "bg-accent text-white",
      description: finalDesc,
      descriptionEn: finalDescEn,
      image: image || "",
      order: order !== undefined ? Number(order) : 0,
      isActive: true,
    });

    res.status(201).json({ success: true, message: "Membre ajouté avec succès.", data: formatMember(member) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Échec de création du membre.", error: error.message });
  }
};

// Mise à jour d'un membre (Admin)
export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.type && !updateData.category) {
      updateData.category = updateData.type;
    }
    if (updateData.bio !== undefined && updateData.description === undefined) {
      updateData.description = updateData.bio;
    }
    if (updateData.bioEn !== undefined && updateData.descriptionEn === undefined) {
      updateData.descriptionEn = updateData.bioEn;
    }

    const member = await Member.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
    if (!member) {
      return res.status(404).json({ success: false, message: "Membre introuvable." });
    }
    res.status(200).json({ success: true, message: "Membre mis à jour.", data: formatMember(member) });
  } catch (error) {
    res.status(500).json({ success: false, message: "Échec de mise à jour.", error: error.message });
  }
};

// Suppression d'un membre (Admin)
export const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Member.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Membre introuvable." });
    }
    res.status(200).json({ success: true, message: "Membre supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Échec de suppression.", error: error.message });
  }
};
