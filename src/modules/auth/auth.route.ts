import { Router } from "express";
import authenticate from "../../middlewares/auth.middleware";
import validateRequest from "../../middlewares/validate.middleware";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(AuthValidation.registerSchema),
  AuthController.register,
);

router.post(
  "/login",
  validateRequest(AuthValidation.loginSchema),
  AuthController.login,
);

router.post("/logout", AuthController.logout);

router.get("/me", authenticate, AuthController.getMe);

export const AuthRoutes = router;
