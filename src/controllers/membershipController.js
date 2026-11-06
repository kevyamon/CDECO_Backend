import {
  createMembershipRequest,
  getMembershipRequests,
  updateMembershipStatus,
  deleteMembershipRequest,
  getMembershipStats,
} from "../services/membershipService.js";
import { membershipSchema, updateStatusSchema } from "../validations/membershipValidation.js";

/**
 * Création d'une demande d'adhésion (Public)
 */
export const submitMembership = async (req, res, next) => {
  try {
    const validatedData = membershipSchema.parse(req.body);
    const request = await createMembershipRequest(validatedData);

    return res.status(201).json({
      success: true,
      message: "Votre demande d'adhésion a été transmise avec succès. Notre équipe l'examinera dans les plus brefs délais.",
      data: request,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Liste paginée des demandes d'adhésion (Admin)
 */
export const listMemberships = async (req, res, next) => {
  try {
    const { status, search, page, limit } = req.query;
    const result = await getMembershipRequests({ status, search, page, limit });

    return res.status(200).json({
      success: true,
      data: result.requests,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Mise à jour du statut d'une adhésion (Admin)
 */
export const changeMembershipStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status, adminNotes } = updateStatusSchema.parse(req.body);

    const updated = await updateMembershipStatus(id, status, adminNotes);

    return res.status(200).json({
      success: true,
      message: `Statut de la demande mis à jour avec succès : ${status}.`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Suppression d'une demande (Admin)
 */
export const removeMembership = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteMembershipRequest(id);

    return res.status(200).json({
      success: true,
      message: "Demande d'adhésion supprimée avec succès.",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Statistiques d'adhésion pour le Dashboard (Admin)
 */
export const getStats = async (req, res, next) => {
  try {
    const stats = await getMembershipStats();
    return res.status(200).json({
      success: true,
      data: stats,
    });
  } catch (error) {
    next(error);
  }
};

