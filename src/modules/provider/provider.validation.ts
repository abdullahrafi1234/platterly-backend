import { z } from "zod";

const updateProviderProfileSchema = z.object({
  body: z.object({
    businessName: z.string().min(2).optional(),
    description: z.string().optional(),
    logo: z.string().url("Logo must be a valid URL").optional(),
  }),
});

export const ProviderValidation = {
  updateProviderProfileSchema,
};
