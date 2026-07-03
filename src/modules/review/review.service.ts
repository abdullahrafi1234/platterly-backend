import prisma from "../../config/db";
import ApiError from "../../utils/ApiError";

interface CreateReviewInput {
  mealId: string;
  rating: number;
  comment?: string;
}

const createReview = async (customerId: string, payload: CreateReviewInput) => {
  const hasOrdered = await prisma.orderItem.findFirst({
    where: {
      mealId: payload.mealId,
      order: {
        customerId,
        status: "DELIVERED",
      },
    },
  });

  if (!hasOrdered) {
    throw new ApiError(
      403,
      "You can only review meals you have ordered and received",
    );
  }

  const existingReview = await prisma.review.findUnique({
    where: {
      customerId_mealId: {
        customerId,
        mealId: payload.mealId,
      },
    },
  });

  if (existingReview) {
    throw new ApiError(409, "You have already reviewed this meal");
  }

  return prisma.review.create({
    data: {
      customerId,
      mealId: payload.mealId,
      rating: payload.rating,
      comment: payload.comment,
    },
    include: {
      customer: { select: { id: true, name: true } },
    },
  });
};

const getMealReviews = async (mealId: string) => {
  return prisma.review.findMany({
    where: { mealId },
    include: {
      customer: { select: { id: true, name: true } },
    },
    orderBy: { createdAt: "desc" },
  });
};

export const ReviewService = {
  createReview,
  getMealReviews,
};
