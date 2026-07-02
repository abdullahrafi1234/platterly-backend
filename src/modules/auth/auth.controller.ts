import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthService } from "./auth.service";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const register = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.register(req.body);

  res.cookie("token", result.token, cookieOptions);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Registered successfully",
    data: result.user,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.login(req.body);

  res.cookie("token", result.token, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged in successfully",
    data: result.user,
  });
});

const logout = catchAsync(async (req: Request, res: Response) => {
  res.clearCookie("token");

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged out successfully",
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User retrieved successfully",
    data: req.user,
  });
});

export const AuthController = {
  register,
  login,
  logout,
  getMe,
};
