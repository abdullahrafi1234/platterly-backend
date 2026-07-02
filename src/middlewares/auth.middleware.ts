import { NextFunction, Request, Response } from "express";
import ApiError from "../utils/ApiError";
import { JwtHelper } from "../utils/jwt";

const authenticate = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      throw new ApiError(401, "You are not authorized. Please login");
    }

    const decoded = JwtHelper.verifyToken(token);
    req.user = decoded;

    next();
  } catch (error) {
    next(new ApiError(401, "Invalid or expired token"));
  }
};

export default authenticate;
