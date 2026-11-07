import Member from "../models/Member.js";

// Liste tous les membres (public / admin)
export const listMembers = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    if (category) filter.category = category;

    const members = await Member.find(filter).sort({ order: 1, createdAt: 1 });
    res.status(200).json({ success: true, count: members.length, data: members });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur lors de la récupération des membres.", error: error.message });
  }
};

// Création d'un membre (Admin)
export const createMember = async (req, res) => {
  try {
    const { name, role, roleEn, category, roleColor, description, descriptionEn, image, order } = req.body;
    if (!name || !role) {
      return res.status(400).json({ success: false, message: "Le nom et le rôle sont obligatoires." });
    }

    const member = await Member.create({
      name,
      role,
      roleEn: roleEn || role,
      category: category || "bureau",
      roleColor: roleColor || "bg-accent text-white",
      description: description || "",
      descriptionEn: descriptionEn || "",
      image: image || "",
      order: order !== undefined ? Number(order) : 0,
      isActive: true,
    });

    res.status(201).json({ success: true, message: "Membre ajouté avec succès.", data: member });
  } catch (error) {
    res.status(500).json({ success: false, message: "Échec de création du membre.", error: error.message });
  }
};

// Mise à jour d'un membre (Admin)
export const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!member) {
      return res.status(404).json({ success: false, message: "Membre introuvable." });
    }
    res.status(200).json({ success: true, message: "Membre mis à jour.", data: member });
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

