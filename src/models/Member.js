import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    roleEn: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      enum: ["bureau", "cci"],
      default: "bureau",
      index: true,
    },
    roleColor: {
      type: String,
      default: "bg-accent text-white",
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    descriptionEn: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "",
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
  }
);

export default mongoose.model("Member", memberSchema);

