import prisma from "../../config/db";
import ApiError from "../../utils/ApiError";

const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

const updateUserStatus = async (userId: string, status: string) => {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role === "ADMIN") {
    throw new ApiError(403, "Cannot change status of an admin");
  }

  return prisma.user.update({
    where: { id: userId },
    data: { status: status as any },
  });
};

const getAllOrders = async () => {
  return prisma.order.findMany({
    include: {
      customer: { select: { id: true, name: true, email: true } },
      items: { include: { meal: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const AdminService = {
  getAllUsers,
  updateUserStatus,
  getAllOrders,
};
