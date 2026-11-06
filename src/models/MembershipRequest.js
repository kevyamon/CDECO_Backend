import mongoose from "mongoose";
import { MEMBERSHIP_STATUS, ALL_MEMBERSHIP_STATUSES } from "../constants/status.js";

const membershipRequestSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Le prénom est requis"],
      trim: true,
    },
    lastName: {
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
    phone: {
      type: String,
      required: [true, "Le numéro de téléphone est requis"],
      trim: true,
    },
    nationality: {
      type: String,
      default: "Congolaise",
      trim: true,
    },
    age: {
      type: Number,
      default: null,
    },
    profession: {
      type: String,
      default: "",
      trim: true,
    },
    organization: {
      type: String,
      default: "",
      trim: true,
    },
    address: {
      type: String,
      default: "",
      trim: true,
    },
    memberType: {
      type: String,
      default: "individuel",
      trim: true,
      index: true,
    },
    motivation: {
      type: String,
      default: "",
      trim: true,
    },
    status: {
      type: String,
      enum: ALL_MEMBERSHIP_STATUSES,
      default: MEMBERSHIP_STATUS.PENDING,
      index: true,
    },
    adminNotes: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Index composé pour les recherches rapides
membershipRequestSchema.index({ status: 1, createdAt: -1 });

export const MembershipRequest = mongoose.model("MembershipRequest", membershipRequestSchema);

