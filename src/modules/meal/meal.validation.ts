import { z } from "zod";

const createMealSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Meal name must be at least 2 characters"),
    description: z.string().optional(),
    price: z.number().positive("Price must be greater than 0"),
    categoryId: z.string().uuid("Invalid category ID"),
    image: z.string().url("Image must be a valid URL").optional(),
  }),
});

const updateMealSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    categoryId: z.string().uuid().optional(),
    image: z.string().url().optional(),
    isAvailable: z.boolean().optional(),
  }),
});

export const MealValidation = {
  createMealSchema,
  updateMealSchema,
};
