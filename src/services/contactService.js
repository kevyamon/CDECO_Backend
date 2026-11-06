import { ContactMessage } from "../models/ContactMessage.js";

/**
 * Enregistre un nouveau message de contact
 */
export const createContactMessage = async (payload) => {
  const message = new ContactMessage(payload);
  return await message.save();
};

/**
 * Récupère les messages de contact avec pagination et filtrage
 */
export const getContactMessages = async ({ isRead, page = 1, limit = 20 }) => {
  const query = {};

  if (isRead !== undefined) {
    query.isRead = isRead === "true" || isRead === true;
  }

  const numericPage = Math.max(1, parseInt(page, 10) || 1);
  const numericLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
  const skip = (numericPage - 1) * numericLimit;

  const [messages, total, unreadCount] = await Promise.all([
    ContactMessage.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(numericLimit)
      .lean(),
    ContactMessage.countDocuments(query),
    ContactMessage.countDocuments({ isRead: false }),
  ]);

  return {
    messages,
    unreadCount,
    pagination: {
      total,
      page: numericPage,
      limit: numericLimit,
      totalPages: Math.ceil(total / numericLimit),
    },
  };
};

/**
 * Marque un message comme lu ou non lu
 */
export const markMessageReadStatus = async (id, isRead = true) => {
  const message = await ContactMessage.findByIdAndUpdate(
    id,
    { isRead },
    { new: true }
  );

  if (!message) {
    const error = new Error("Message de contact introuvable.");
    error.statusCode = 404;
    throw error;
  }

  return message;
};

/**
 * Supprime un message de contact
 */
export const deleteContactMessage = async (id) => {
  const message = await ContactMessage.findByIdAndDelete(id);
  if (!message) {
    const error = new Error("Message de contact introuvable.");
    error.statusCode = 404;
    throw error;
  }
  return message;
};

