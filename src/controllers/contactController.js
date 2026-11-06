import {
  createContactMessage,
  getContactMessages,
  markMessageReadStatus,
  deleteContactMessage,
} from "../services/contactService.js";
import { contactSchema } from "../validations/contactValidation.js";

/**
 * Envoi d'un message via le formulaire de contact (Public)
 */
export const submitContact = async (req, res, next) => {
  try {
    const validatedData = contactSchema.parse(req.body);
    const message = await createContactMessage(validatedData);

    return res.status(201).json({
      success: true,
      message: "Votre message a été transmis avec succès. Nous vous répondrons dans les plus brefs délais.",
      data: message,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Liste des messages reçus (Admin)
 */
export const listMessages = async (req, res, next) => {
  try {
    const { isRead, page, limit } = req.query;
    const result = await getContactMessages({ isRead, page, limit });

    return res.status(200).json({
      success: true,
      data: result.messages,
      unreadCount: result.unreadCount,
      pagination: result.pagination,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Marquer un message comme lu / non lu (Admin)
 */
export const toggleReadStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { isRead } = req.body;
    const updated = await markMessageReadStatus(id, isRead ?? true);

    return res.status(200).json({
      success: true,
      message: `Message marqué comme ${updated.isRead ? "lu" : "non lu"}.`,
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Supprimer un message (Admin)
 */
export const removeMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteContactMessage(id);

    return res.status(200).json({
      success: true,
      message: "Message supprimé avec succès.",
    });
  } catch (error) {
    next(error);
  }
};

