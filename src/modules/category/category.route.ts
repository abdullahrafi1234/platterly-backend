import { Router } from "express";
import authenticate from "../../middlewares/auth.middleware";
import authorize from "../../middlewares/role.middleware";
import validateRequest from "../../middlewares/validate.middleware";
import { CategoryController } from "./category.controller";
import { CategoryValidation } from "./category.validation";

const router = Router();

router.get("/", CategoryController.getAllCategories);

router.post(
  "/",
  authenticate,
  authorize("ADMIN"),
  validateRequest(CategoryValidation.createCategorySchema),
  CategoryController.createCategory,
);

router.delete(
  "/:id",
  authenticate,
  authorize("ADMIN"),
  CategoryController.deleteCategory,
);

export const CategoryRoutes = router;
