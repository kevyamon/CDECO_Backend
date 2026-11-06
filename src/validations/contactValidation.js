import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string({ required_error: "Le nom est requis" })
    .min(2, "Le nom doit comporter au moins 2 caractères")
    .trim(),
  email: z
    .string({ required_error: "L'adresse email est requise" })
    .email("Format d'adresse email invalide")
    .toLowerCase()
    .trim(),
  subject: z.string().trim().optional().default("Demande de contact CDECO"),
  message: z
    .string({ required_error: "Le message est requis" })
    .min(5, "Le message doit comporter au moins 5 caractères")
    .trim(),
});

