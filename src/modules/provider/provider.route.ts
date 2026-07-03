import { Router } from "express";
import authenticate from "../../middlewares/auth.middleware";
import authorize from "../../middlewares/role.middleware";
import validateRequest from "../../middlewares/validate.middleware";
import { ProviderController } from "./provider.controller";
import { ProviderValidation } from "./provider.validation";

const router = Router();

router.get("/", ProviderController.getAllProviders);
router.get(
  "/me",
  authenticate,
  authorize("PROVIDER"),
  ProviderController.getMyProfile,
);
router.patch(
  "/me",
  authenticate,
  authorize("PROVIDER"),
  validateRequest(ProviderValidation.updateProviderProfileSchema),
  ProviderController.updateMyProfile,
);
router.get("/:id", ProviderController.getProviderById);

export const ProviderRoutes = router;
