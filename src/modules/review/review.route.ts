import { Router } from "express";
import authenticate from "../../middlewares/auth.middleware";
import authorize from "../../middlewares/role.middleware";
import validateRequest from "../../middlewares/validate.middleware";
import { ReviewController } from "./review.controller";
import { ReviewValidation } from "./review.validation";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("CUSTOMER"),
  validateRequest(ReviewValidation.createReviewSchema),
  ReviewController.createReview,
);

router.get("/meal/:mealId", ReviewController.getMealReviews);

export const ReviewRoutes = router;
