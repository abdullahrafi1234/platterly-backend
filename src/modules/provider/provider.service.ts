import prisma from "../../config/db";
import ApiError from "../../utils/ApiError";

const getMyProfile = async (userId: string) => {
  const profile = await prisma.providerProfile.findUnique({
    where: { userId },
    include: { user: { select: { name: true, email: true, phone: true } } },
  });

  if (!profile) {
    throw new ApiError(404, "Provider profile not found");
  }

  return profile;
};

const updateMyProfile = async (
  userId: string,
  payload: { businessName?: string; description?: string; logo?: string },
) => {
  const profile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw new ApiError(404, "Provider profile not found");
  }

  return prisma.providerProfile.update({
    where: { userId },
    data: payload,
  });
};

const getAllProviders = async () => {
  return prisma.providerProfile.findMany({
    include: { user: { select: { name: true, email: true } } },
  });
};

const getProviderById = async (id: string) => {
  const provider = await prisma.providerProfile.findUnique({
    where: { id },
    include: {
      user: { select: { name: true } },
      meals: { where: { isAvailable: true } },
    },
  });

  if (!provider) {
    throw new ApiError(404, "Provider not found");
  }

  return provider;
};

export const ProviderService = {
  getMyProfile,
  updateMyProfile,
  getAllProviders,
  getProviderById,
};
