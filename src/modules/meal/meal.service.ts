import prisma from "../../config/db";
import ApiError from "../../utils/ApiError";

interface MealFilters {
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  search?: string;
}

interface CreateMealInput {
  name: string;
  description?: string;
  price: number;
  categoryId: string;
  image?: string;
}

const getProviderProfileByUserId = async (userId: string) => {
  const profile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!profile) {
    throw new ApiError(404, "Provider profile not found");
  }

  return profile;
};

const createMeal = async (userId: string, payload: CreateMealInput) => {
  const providerProfile = await getProviderProfileByUserId(userId);

  return prisma.meal.create({
    data: {
      ...payload,
      providerId: providerProfile.id,
    },
  });
};

const getAllMeals = async (filters: MealFilters) => {
  const { category, minPrice, maxPrice, search } = filters;

  return prisma.meal.findMany({
    where: {
      isAvailable: true,
      ...(category && { categoryId: category }),
      ...(search && {
        name: { contains: search, mode: "insensitive" },
      }),
      ...((minPrice || maxPrice) && {
        price: {
          ...(minPrice && { gte: Number(minPrice) }),
          ...(maxPrice && { lte: Number(maxPrice) }),
        },
      }),
    },
    include: {
      category: true,
      provider: { select: { businessName: true, id: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

const getMealById = async (id: string) => {
  const meal = await prisma.meal.findUnique({
    where: { id },
    include: {
      category: true,
      provider: { select: { businessName: true, id: true, logo: true } },
      reviews: { include: { customer: { select: { name: true } } } },
    },
  });

  if (!meal) {
    throw new ApiError(404, "Meal not found");
  }

  return meal;
};

const updateMeal = async (
  userId: string,
  mealId: string,
  payload: Partial<CreateMealInput>,
) => {
  const providerProfile = await getProviderProfileByUserId(userId);

  const meal = await prisma.meal.findUnique({ where: { id: mealId } });

  if (!meal) {
    throw new ApiError(404, "Meal not found");
  }

  if (meal.providerId !== providerProfile.id) {
    throw new ApiError(403, "You can only update your own meals");
  }

  return prisma.meal.update({ where: { id: mealId }, data: payload });
};

const deleteMeal = async (userId: string, mealId: string) => {
  const providerProfile = await getProviderProfileByUserId(userId);

  const meal = await prisma.meal.findUnique({ where: { id: mealId } });

  if (!meal) {
    throw new ApiError(404, "Meal not found");
  }

  if (meal.providerId !== providerProfile.id) {
    throw new ApiError(403, "You can only delete your own meals");
  }

  return prisma.meal.delete({ where: { id: mealId } });
};

const getMyMeals = async (userId: string) => {
  const providerProfile = await getProviderProfileByUserId(userId);

  return prisma.meal.findMany({
    where: { providerId: providerProfile.id },
    include: { category: true },
    orderBy: { createdAt: "desc" },
  });
};

export const MealService = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
  getMyMeals,
};
