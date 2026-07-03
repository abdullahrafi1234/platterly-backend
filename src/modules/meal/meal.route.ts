import { Router } from "express";
import authenticate from "../../middlewares/auth.middleware";
import authorize from "../../middlewares/role.middleware";
import validateRequest from "../../middlewares/validate.middleware";
import { MealController } from "./meal.controller";
import { MealValidation } from "./meal.validation";

const router = Router();

router.get("/", MealController.getAllMeals);
router.get(
  "/my-meals",
  authenticate,
  authorize("PROVIDER"),
  MealController.getMyMeals,
);
router.get("/:id", MealController.getMealById);

router.post(
  "/",
  authenticate,
  authorize("PROVIDER"),
  validateRequest(MealValidation.createMealSchema),
  MealController.createMeal,
);

router.put(
  "/:id",
  authenticate,
  authorize("PROVIDER"),
  validateRequest(MealValidation.updateMealSchema),
  MealController.updateMeal,
);

router.delete(
  "/:id",
  authenticate,
  authorize("PROVIDER"),
  MealController.deleteMeal,
);

export const MealRoutes = router;
