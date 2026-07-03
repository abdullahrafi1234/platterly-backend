import { z } from "zod";

const createOrderSchema = z.object({
  body: z.object({
    deliveryAddress: z.string().min(5, "Delivery address is required"),
    items: z
      .array(
        z.object({
          mealId: z.string().uuid("Invalid meal ID"),
          quantity: z.number().int().positive("Quantity must be at least 1"),
        }),
      )
      .min(1, "Order must have at least one item"),
  }),
});

const updateOrderStatusSchema = z.object({
  body: z.object({
    status: z.enum(["PREPARING", "READY", "DELIVERED"]),
  }),
});

export const OrderValidation = {
  createOrderSchema,
  updateOrderStatusSchema,
};
