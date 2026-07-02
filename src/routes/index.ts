import { Router } from "express";

const router = Router();

const moduleRoutes: { path: string; route: Router }[] = [
  // auth, meal, order routes will be added here
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
