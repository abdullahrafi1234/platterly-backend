import { Router } from "express";
import authenticate from "../../middlewares/auth.middleware";
import authorize from "../../middlewares/role.middleware";
import validateRequest from "../../middlewares/validate.middleware";
import { AdminController } from "./admin.controller";
import { AdminValidation } from "./admin.validation";

const router = Router();

router.use(authenticate, authorize("ADMIN"));

router.get("/users", AdminController.getAllUsers);
router.patch(
  "/users/:id/status",
  validateRequest(AdminValidation.updateUserStatusSchema),
  AdminController.updateUserStatus,
);
router.get("/orders", AdminController.getAllOrders);

export const AdminRoutes = router;
