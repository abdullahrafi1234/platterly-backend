import { Router } from "express";
import authenticate from "../../middlewares/auth.middleware";
import { PaymentController } from "./payment.controller";

const router = Router();

router.post("/init/:orderId", authenticate, PaymentController.initPayment);
router.post("/success/:orderId", PaymentController.paymentSuccess);
router.post("/fail/:orderId", PaymentController.paymentFail);
router.post("/cancel/:orderId", PaymentController.paymentCancel);
router.post(
  "/stripe/init/:orderId",
  authenticate,
  PaymentController.initStripePayment,
);

export const PaymentRoutes = router;
