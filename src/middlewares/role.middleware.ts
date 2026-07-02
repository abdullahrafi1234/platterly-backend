import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";

const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      throw new ApiError(
        403,
        "You do not have permission to access this resource",
      );
    }
    next();
  };
};

export default authorize;
