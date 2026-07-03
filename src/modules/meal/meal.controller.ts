import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { MealService } from "./meal.service";

const createMeal = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const result = await MealService.createMeal(userId, req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Meal created successfully",
    data: result,
  });
});

const getAllMeals = catchAsync(async (req: Request, res: Response) => {
  const filters = {
    category: req.query.category as string | undefined,
    minPrice: req.query.minPrice as string | undefined,
    maxPrice: req.query.maxPrice as string | undefined,
    search: req.query.search as string | undefined,
  };

  const result = await MealService.getAllMeals(filters);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Meals retrieved successfully",
    data: result,
  });
});

const getMealById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const result = await MealService.getMealById(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Meal retrieved successfully",
    data: result,
  });
});

const updateMeal = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const id = req.params.id as string;
  const result = await MealService.updateMeal(userId, id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Meal updated successfully",
    data: result,
  });
});

const deleteMeal = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const id = req.params.id as string;
  await MealService.deleteMeal(userId, id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Meal deleted successfully",
  });
});

const getMyMeals = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const result = await MealService.getMyMeals(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Your meals retrieved successfully",
    data: result,
  });
});

export const MealController = {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
  getMyMeals,
};
