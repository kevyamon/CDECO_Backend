import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom est requis"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "L'adresse email est requise"],
      lowercase: true,
      trim: true,
      index: true,
    },
    subject: {
      type: String,
      default: "Demande d'information",
      trim: true,
    },
    message: {
      type: String,
      required: [true, "Le message est requis"],
      trim: true,
    },
    isRead: {
      type: Boolean,
      default: false,
      index: true,
    },
    repliedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

contactMessageSchema.index({ isRead: 1, createdAt: -1 });

export const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

