import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "L'identifiant ou l'email est requis" })
    .min(3, "L'identifiant doit comporter au moins 3 caractères")
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: "Le mot de passe est requis" })
    .min(1, "Le mot de passe est requis"),
});

export const registerSchema = z.object({
  email: z
    .string({ required_error: "L'adresse email est requise" })
    .email("Format d'adresse email invalide")
    .toLowerCase()
    .trim(),
  password: z
    .string({ required_error: "Le mot de passe est requis" })
    .min(6, "Le mot de passe doit comporter au moins 6 caractères"),
  firstName: z.string().optional().default(""),
  lastName: z.string().optional().default(""),
});

