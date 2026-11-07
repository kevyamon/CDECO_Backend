import mongoose from "mongoose";

const siteMediaSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    title: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      enum: ["hero", "leadership", "gallery", "partner", "video", "section", "general", "events", "kampus", "resources"],
      default: "general",
      index: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    publicId: {
      type: String,
      default: "",
      trim: true,
    },
    altText: {
      type: String,
      default: "Illustration CDECO",
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

siteMediaSchema.index({ category: 1, order: 1 });

export const SiteMedia = mongoose.model("SiteMedia", siteMediaSchema);

