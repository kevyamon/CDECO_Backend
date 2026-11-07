import SiteSettings from "../models/SiteSettings.js";

const DEFAULT_SETTINGS = {
  key: "contact_info",
  phone: "+242 05 595 8119",
  email: "contact@cdeco.com",
  address: "Moungali Centre-Ville, Brazzaville, République du Congo",
  addressEn: "Moungali Downtown, Brazzaville, Republic of the Congo",
  hours: "Lun - Ven : 8h00 - 17h00 | Sam : 9h00 - 13h00",
  hoursEn: "Mon - Fri: 8:00 AM - 5:00 PM | Sat: 9:00 AM - 1:00 PM",
  facebook: "https://www.facebook.com/share/1B3SMHVzWk/?mibextid=wwXIfr",
  linkedin: "https://www.linkedin.com/company/chambre-de-diplomatie-economique-du-congo/",
  twitter: "https://twitter.com/cdeco",
  website: "https://cdeco.org",
  kampusDirectorName: "Steve Patrick MBOUKOU",
  kampusDirectorTitle: "Directeur KAMPUS CDECO",
  kampusDirectorTitleEn: "Director of KAMPUS CDECO",
  kampusDirectorBio: "Chargé de l'entrepreneuriat des jeunes et du développement des compétences pour la nouvelle génération congolaise.",
  kampusDirectorBioEn: "In charge of youth entrepreneurship and professional skill-building for the new Congolese generation.",
  kampusDirectorImage: "",
  kampusAddress: "n°40 Av. des 3 martyrs, Moungali Brazzaville",
  kampusEmail: "contact@cdeco.com",
  kampusWebsite: "www.cdeco.com",
};

// Récupère les paramètres de contact (Public)
export const getContactSettings = async (req, res) => {
  try {
    let settings = await SiteSettings.findOne({ key: "contact_info" });
    if (!settings) {
      settings = await SiteSettings.create(DEFAULT_SETTINGS);
    }
    res.status(200).json({ success: true, data: settings });
  } catch (error) {
    res.status(200).json({ success: true, data: DEFAULT_SETTINGS });
  }
};

// Met à jour les paramètres de contact (Admin)
export const updateContactSettings = async (req, res) => {
  try {
    const updateData = { ...req.body, key: "contact_info" };
    const settings = await SiteSettings.findOneAndUpdate(
      { key: "contact_info" },
      updateData,
      { new: true, upsert: true, runValidators: true }
    );
    res.status(200).json({ success: true, message: "Coordonnées mises à jour avec succès.", data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: "Échec de mise à jour des paramètres.", error: error.message });
  }
};

