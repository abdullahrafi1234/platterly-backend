import prisma from "../../config/db";
import ApiError from "../../utils/ApiError";

const createCategory = async (name: string) => {
  const existing = await prisma.category.findUnique({ where: { name } });

  if (existing) {
    throw new ApiError(409, "Category already exists");
  }

  return prisma.category.create({ data: { name } });
};

const getAllCategories = async () => {
  return prisma.category.findMany({ orderBy: { name: "asc" } });
};

const deleteCategory = async (id: string) => {
  const category = await prisma.category.findUnique({ where: { id } });

  if (!category) {
    throw new ApiError(404, "Category not found");
  }

  return prisma.category.delete({ where: { id } });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  deleteCategory,
};
