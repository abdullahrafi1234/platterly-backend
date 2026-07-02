import bcrypt from "bcryptjs";
import prisma from "../../config/db";
import ApiError from "../../utils/ApiError";
import { JwtHelper } from "../../utils/jwt";

interface RegisterInput {
  name: string;
  email: string;
  password: string;
  role: "CUSTOMER" | "PROVIDER";
  phone?: string;
  address?: string;
  businessName?: string;
}

interface LoginInput {
  email: string;
  password: string;
}

const register = async (payload: RegisterInput) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    throw new ApiError(409, "Email already registered");
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const user = await prisma.user.create({
    data: {
      name: payload.name,
      email: payload.email,
      password: hashedPassword,
      role: payload.role,
      phone: payload.phone,
      address: payload.address,
      ...(payload.role === "PROVIDER" && {
        providerProfile: {
          create: {
            businessName: payload.businessName || payload.name,
          },
        },
      }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });

  const token = JwtHelper.generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  return { user, token };
};

const login = async (payload: LoginInput) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  if (user.status === "SUSPENDED") {
    throw new ApiError(403, "Your account has been suspended");
  }

  const isPasswordValid = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = JwtHelper.generateToken({
    id: user.id,
    email: user.email,
    role: user.role,
  });

  const { password, ...userWithoutPassword } = user;

  return { user: userWithoutPassword, token };
};

export const AuthService = {
  register,
  login,
};
