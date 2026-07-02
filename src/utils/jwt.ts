import jwt, { SignOptions } from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

const generateToken = (
  payload: JwtPayload,
  expiresIn: string = "7d",
): string => {
  return jwt.sign(
    payload,
    process.env.JWT_SECRET as string,
    {
      expiresIn,
    } as SignOptions,
  );
};

const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};

export const JwtHelper = {
  generateToken,
  verifyToken,
};
