import Event from "../models/Event.js";

// Liste tous les événements (filtrable par category)
export const listEvents = async (req, res) => {
  try {
    const { category, all } = req.query;
    const filter = {};
    if (category) filter.category = category;
    if (all !== "true") filter.isActive = true;

    const events = await Event.find(filter).sort({ order: 1, createdAt: -1 });
    res.status(200).json({ success: true, count: events.length, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur lors de la récupération des événements.", error: error.message });
  }
};

// Récupère un événement spécifique par son ID ou slug
export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    let event = null;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      event = await Event.findById(id);
    }
    if (!event) {
      event = await Event.findOne({ slug: id });
    }
    if (!event) {
      return res.status(404).json({ success: false, message: "Événement introuvable." });
    }
    res.status(200).json({ success: true, data: event });
  } catch (error) {
    res.status(500).json({ success: false, message: "Erreur serveur.", error: error.message });
  }
};

// Création d'un événement (Admin)
export const createEvent = async (req, res) => {
  try {
    const {
      title,
      titleEn,
      category,
      date,
      dateEn,
      location,
      locationEn,
      type,
      typeEn,
      typeColor,
      description,
      descriptionEn,
      attendees,
      attendeesEn,
      impact,
      impactEn,
      image,
      order,
    } = req.body;

    if (!title) {
      return res.status(400).json({ success: false, message: "Le titre de l'événement est requis." });
    }

    const slug = title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") + `-${Date.now().toString().slice(-4)}`;

    const newEvent = await Event.create({
      title,
      titleEn: titleEn || title,
      category: category || "upcoming",
      date: date || "",
      dateEn: dateEn || date || "",
      location: location || "",
      locationEn: locationEn || location || "",
      type: type || "Événement",
      typeEn: typeEn || "Event",
      typeColor: typeColor || "bg-primary",
      description: description || "",
      descriptionEn: descriptionEn || "",
      attendees: attendees || "",
      attendeesEn: attendeesEn || "",
      impact: impact || "",
      impactEn: impactEn || "",
      image: image || "",
      slug,
      order: order !== undefined ? Number(order) : 0,
      isActive: true,
    });

    res.status(201).json({ success: true, message: "Événement créé avec succès.", data: newEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: "Échec de création de l'événement.", error: error.message });
  }
};

// Mise à jour d'un événement (Admin)
export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: "Événement non trouvé." });
    }

    res.status(200).json({ success: true, message: "Événement mis à jour.", data: updatedEvent });
  } catch (error) {
    res.status(500).json({ success: false, message: "Échec de mise à jour.", error: error.message });
  }
};

// Suppression d'un événement (Admin)
export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Event.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Événement non trouvé." });
    }
    res.status(200).json({ success: true, message: "Événement supprimé avec succès." });
  } catch (error) {
    res.status(500).json({ success: false, message: "Échec de suppression.", error: error.message });
  }
};

