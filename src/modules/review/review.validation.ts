import { z } from "zod";

const createReviewSchema = z.object({
  body: z.object({
    mealId: z.string().uuid("Invalid meal ID"),
    rating: z
      .number()
      .int()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    comment: z.string().optional(),
  }),
});

export const ReviewValidation = {
  createReviewSchema,
};
