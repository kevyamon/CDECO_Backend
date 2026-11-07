import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    titleEn: {
      type: String,
      default: "",
      trim: true,
    },
    category: {
      type: String,
      enum: ["upcoming", "highlight", "past"],
      default: "upcoming",
      index: true,
    },
    date: {
      type: String,
      default: "",
      trim: true,
    },
    dateEn: {
      type: String,
      default: "",
      trim: true,
    },
    location: {
      type: String,
      default: "",
      trim: true,
    },
    locationEn: {
      type: String,
      default: "",
      trim: true,
    },
    type: {
      type: String,
      default: "Événement",
      trim: true,
    },
    typeEn: {
      type: String,
      default: "Event",
      trim: true,
    },
    typeColor: {
      type: String,
      default: "bg-primary",
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
    attendees: {
      type: String,
      default: "",
      trim: true,
    },
    attendeesEn: {
      type: String,
      default: "",
      trim: true,
    },
    impact: {
      type: String,
      default: "",
      trim: true,
    },
    impactEn: {
      type: String,
      default: "",
      trim: true,
    },
    image: {
      type: String,
      default: "",
      trim: true,
    },
    slug: {
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
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

eventSchema.index({ category: 1, order: 1, createdAt: -1 });

export default mongoose.model("Event", eventSchema);

