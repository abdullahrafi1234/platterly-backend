import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ProviderService } from "./provider.service";

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProviderService.getMyProfile(req.user!.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile retrieved",
    data: result,
  });
});

const updateMyProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await ProviderService.updateMyProfile(req.user!.id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated",
    data: result,
  });
});

const getAllProviders = catchAsync(async (req: Request, res: Response) => {
  const result = await ProviderService.getAllProviders();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Providers retrieved",
    data: result,
  });
});

const getProviderById = catchAsync(async (req: Request, res: Response) => {
  const result = await ProviderService.getProviderById(req.params.id as string);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Provider retrieved",
    data: result,
  });
});

export const ProviderController = {
  getMyProfile,
  updateMyProfile,
  getAllProviders,
  getProviderById,
};
