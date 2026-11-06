import { MembershipRequest } from "../models/MembershipRequest.js";
import { MEMBERSHIP_STATUS } from "../constants/status.js";

/**
 * Crée une nouvelle demande d'adhésion
 */
export const createMembershipRequest = async (payload) => {
  const request = new MembershipRequest(payload);
  return await request.save();
};

/**
 * Récupère la liste paginée et filtrée des demandes d'adhésion
 */
export const getMembershipRequests = async ({ status, search, page = 1, limit = 20 }) => {
  const query = {};

  if (status && Object.values(MEMBERSHIP_STATUS).includes(status)) {
    query.status = status;
  }

  if (search) {
    const regex = new RegExp(search, "i");
    query.$or = [
      { firstName: regex },
      { lastName: regex },
      { email: regex },
      { phone: regex },
      { organization: regex },
    ];
  }

  const numericPage = Math.max(1, parseInt(page, 10) || 1);
  const numericLimit = Math.min(100, Math.max(1, parseInt(limit, 10) || 20));
  const skip = (numericPage - 1) * numericLimit;

  const [requests, total] = await Promise.all([
    MembershipRequest.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(numericLimit)
      .lean(),
    MembershipRequest.countDocuments(query),
  ]);

  return {
    requests,
    pagination: {
      total,
      page: numericPage,
      limit: numericLimit,
      totalPages: Math.ceil(total / numericLimit),
    },
  };
};

/**
 * Met à jour le statut d'une demande d'adhésion
 */
export const updateMembershipStatus = async (id, status, adminNotes = "") => {
  const updateData = { status };
  if (adminNotes !== undefined) {
    updateData.adminNotes = adminNotes;
  }

  const request = await MembershipRequest.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!request) {
    const error = new Error("Demande d'adhésion introuvable.");
    error.statusCode = 404;
    throw error;
  }

  return request;
};

/**
 * Supprime une demande d'adhésion
 */
export const deleteMembershipRequest = async (id) => {
  const request = await MembershipRequest.findByIdAndDelete(id);
  if (!request) {
    const error = new Error("Demande d'adhésion introuvable.");
    error.statusCode = 404;
    throw error;
  }
  return request;
};

/**
 * Calcule les indicateurs statistiques pour le dashboard
 */
export const getMembershipStats = async () => {
  const [total, pending, approved, rejected] = await Promise.all([
    MembershipRequest.countDocuments(),
    MembershipRequest.countDocuments({ status: MEMBERSHIP_STATUS.PENDING }),
    MembershipRequest.countDocuments({ status: MEMBERSHIP_STATUS.APPROVED }),
    MembershipRequest.countDocuments({ status: MEMBERSHIP_STATUS.REJECTED }),
  ]);

  const approvalRate = total > 0 ? Math.round((approved / total) * 100) : 0;

  // Répartition par mois sur les 6 derniers mois
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);

  const monthlyAgg = await MembershipRequest.aggregate([
    { $match: { createdAt: { $gte: sixMonthsAgo } } },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
        },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
  ]);

  return {
    total,
    pending,
    approved,
    rejected,
    approvalRate,
    monthly: monthlyAgg,
  };
};

