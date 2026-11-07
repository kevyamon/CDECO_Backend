import mongoose from "mongoose";

const siteSettingsSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      default: "contact_info",
    },
    phone: {
      type: String,
      default: "+242 05 595 8119",
      trim: true,
    },
    email: {
      type: String,
      default: "contact@cdeco.com",
      trim: true,
    },
    address: {
      type: String,
      default: "Moungali Centre-Ville, Brazzaville, République du Congo",
      trim: true,
    },
    addressEn: {
      type: String,
      default: "Moungali Downtown, Brazzaville, Republic of the Congo",
      trim: true,
    },
    hours: {
      type: String,
      default: "Lun - Ven : 8h00 - 17h00 | Sam : 9h00 - 13h00",
      trim: true,
    },
    hoursEn: {
      type: String,
      default: "Mon - Fri: 8:00 AM - 5:00 PM | Sat: 9:00 AM - 1:00 PM",
      trim: true,
    },
    facebook: {
      type: String,
      default: "https://www.facebook.com/share/1B3SMHVzWk/?mibextid=wwXIfr",
      trim: true,
    },
    linkedin: {
      type: String,
      default: "https://www.linkedin.com/company/chambre-de-diplomatie-economique-du-congo/",
      trim: true,
    },
    twitter: {
      type: String,
      default: "https://twitter.com/cdeco",
      trim: true,
    },
    website: {
      type: String,
      default: "https://cdeco.org",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("SiteSettings", siteSettingsSchema);

