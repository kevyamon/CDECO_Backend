import { z } from "zod";

export const membershipSchema = z
  .object({
    firstName: z.string().trim().optional(),
    first_name: z.string().trim().optional(),
    lastName: z.string().trim().optional(),
    last_name: z.string().trim().optional(),
    email: z
      .string({ required_error: "L'adresse email est requise" })
      .email("Format d'adresse email invalide")
      .toLowerCase()
      .trim(),
    phone: z
      .string({ required_error: "Le numéro de téléphone est requis" })
      .min(6, "Le numéro de téléphone doit être valide")
      .trim(),
    nationality: z.string().trim().optional().default("Congolaise"),
    age: z.union([z.number(), z.string()]).optional(),
    profession: z.string().trim().optional().default(""),
    organization: z.string().trim().optional().default(""),
    address: z.string().trim().optional().default(""),
    memberType: z.string().trim().optional(),
    member_type: z.string().trim().optional(),
    motivation: z.string().trim().optional().default(""),
  })
  .transform((data) => {
    return {
      firstName: (data.firstName || data.first_name || "").trim(),
      lastName: (data.lastName || data.last_name || "").trim(),
      email: data.email,
      phone: data.phone,
      nationality: (data.nationality || "Congolaise").trim(),
      age: data.age ? Number(data.age) : null,
      profession: (data.profession || "").trim(),
      organization: (data.organization || "").trim(),
      address: (data.address || "").trim(),
      memberType: (data.memberType || data.member_type || "individuel").trim(),
      motivation: (data.motivation || "").trim(),
    };
  })
  .refine((data) => data.firstName.length > 0, {
    message: "Le prénom est requis",
    path: ["firstName"],
  })
  .refine((data) => data.lastName.length > 0, {
    message: "Le nom est requis",
    path: ["lastName"],
  });

export const updateStatusSchema = z.object({
  status: z.enum(["pending", "approved", "rejected"], {
    required_error: "Le statut est requis",
  }),
  adminNotes: z.string().optional(),
});

