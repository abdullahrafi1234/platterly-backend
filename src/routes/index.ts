import { AdminRoutes } from "@/modules/admin/admin.route";
import { CategoryRoutes } from "@/modules/category/category.route";
import { MealRoutes } from "@/modules/meal/meal.route";
import { OrderRoutes } from "@/modules/order/order.route";
import { PaymentRoutes } from "@/modules/payment/payment.route";
import { ProviderRoutes } from "@/modules/provider/provider.route";
import { ReviewRoutes } from "@/modules/review/review.route";
import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes: { path: string; route: Router }[] = [
  { path: "/auth", route: AuthRoutes },
  { path: "/categories", route: CategoryRoutes },
  { path: "/meals", route: MealRoutes },
  { path: "/orders", route: OrderRoutes },
  { path: "/reviews", route: ReviewRoutes },
  { path: "/admin", route: AdminRoutes },
  { path: "/providers", route: ProviderRoutes },
  { path: "/payment", route: PaymentRoutes },
];
//
moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
