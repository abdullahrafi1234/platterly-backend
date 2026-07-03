import { Router } from "express";
import authenticate from "../../middlewares/auth.middleware";
import authorize from "../../middlewares/role.middleware";
import validateRequest from "../../middlewares/validate.middleware";
import { OrderController } from "./order.controller";
import { OrderValidation } from "./order.validation";

const router = Router();

router.post(
  "/",
  authenticate,
  authorize("CUSTOMER"),
  validateRequest(OrderValidation.createOrderSchema),
  OrderController.createOrder,
);

router.get(
  "/my-orders",
  authenticate,
  authorize("CUSTOMER"),
  OrderController.getMyOrders,
);

router.get(
  "/provider-orders",
  authenticate,
  authorize("PROVIDER"),
  OrderController.getProviderOrders,
);

router.get("/:id", authenticate, OrderController.getOrderById);

router.patch(
  "/:id/status",
  authenticate,
  authorize("PROVIDER"),
  validateRequest(OrderValidation.updateOrderStatusSchema),
  OrderController.updateOrderStatus,
);

router.patch(
  "/:id/cancel",
  authenticate,
  authorize("CUSTOMER"),
  OrderController.cancelOrder,
);

export const OrderRoutes = router;
