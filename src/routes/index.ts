import { CategoryRoutes } from "@/modules/category/category.route";
import { MealRoutes } from "@/modules/meal/meal.route";
import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";

const router = Router();

const moduleRoutes: { path: string; route: Router }[] = [
  { path: "/auth", route: AuthRoutes },
  { path: "/categories", route: CategoryRoutes },
  { path: "/meals", route: MealRoutes },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
