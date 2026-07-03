import prisma from "../../config/db";
import ApiError from "../../utils/ApiError";

interface OrderItemInput {
  mealId: string;
  quantity: number;
}

interface CreateOrderInput {
  deliveryAddress: string;
  items: OrderItemInput[];
}

const createOrder = async (customerId: string, payload: CreateOrderInput) => {
  const mealIds = payload.items.map((item) => item.mealId);

  const meals = await prisma.meal.findMany({
    where: { id: { in: mealIds } },
  });

  if (meals.length !== mealIds.length) {
    throw new ApiError(404, "One or more meals not found");
  }

  const unavailable = meals.find((meal) => !meal.isAvailable);
  if (unavailable) {
    throw new ApiError(400, `${unavailable.name} is currently unavailable`);
  }

  const providerIds = new Set(meals.map((meal) => meal.providerId));
  if (providerIds.size > 1) {
    throw new ApiError(
      400,
      "All items in one order must be from the same provider",
    );
  }

  let totalAmount = 0;
  const orderItemsData = payload.items.map((item) => {
    const meal = meals.find((m) => m.id === item.mealId)!;
    totalAmount += meal.price * item.quantity;
    return {
      mealId: meal.id,
      quantity: item.quantity,
      price: meal.price,
    };
  });

  return prisma.order.create({
    data: {
      customerId,
      deliveryAddress: payload.deliveryAddress,
      totalAmount,
      items: { create: orderItemsData },
    },
    include: { items: { include: { meal: true } } },
  });
};

const getMyOrders = async (customerId: string) => {
  return prisma.order.findMany({
    where: { customerId },
    include: { items: { include: { meal: true } } },
    orderBy: { createdAt: "desc" },
  });
};

const getOrderById = async (userId: string, role: string, orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: { include: { meal: true } },
      customer: { select: { id: true, name: true, phone: true } },
    },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (role === "CUSTOMER" && order.customerId !== userId) {
    throw new ApiError(403, "You can only view your own orders");
  }

  return order;
};

const getProviderOrders = async (userId: string) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!providerProfile) {
    throw new ApiError(404, "Provider profile not found");
  }

  return prisma.order.findMany({
    where: { items: { some: { meal: { providerId: providerProfile.id } } } },
    include: {
      items: { include: { meal: true } },
      customer: {
        select: { id: true, name: true, phone: true, address: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });
};

const updateOrderStatus = async (
  userId: string,
  orderId: string,
  status: string,
) => {
  const providerProfile = await prisma.providerProfile.findUnique({
    where: { userId },
  });

  if (!providerProfile) {
    throw new ApiError(404, "Provider profile not found");
  }

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { items: { include: { meal: true } } },
  });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  const belongsToProvider = order.items.every(
    (item) => item.meal.providerId === providerProfile.id,
  );

  if (!belongsToProvider) {
    throw new ApiError(403, "You can only update your own orders");
  }

  const validTransitions: Record<string, string[]> = {
    PLACED: ["PREPARING"],
    PREPARING: ["READY"],
    READY: ["DELIVERED"],
  };

  if (!validTransitions[order.status]?.includes(status)) {
    throw new ApiError(
      400,
      `Cannot change status from ${order.status} to ${status}`,
    );
  }

  return prisma.order.update({
    where: { id: orderId },
    data: { status: status as any },
  });
};

const cancelOrder = async (customerId: string, orderId: string) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });

  if (!order) {
    throw new ApiError(404, "Order not found");
  }

  if (order.customerId !== customerId) {
    throw new ApiError(403, "You can only cancel your own orders");
  }

  if (order.status !== "PLACED") {
    throw new ApiError(
      400,
      "Order can only be cancelled while status is PLACED",
    );
  }

  return prisma.order.update({
    where: { id: orderId },
    data: { status: "CANCELLED" },
  });
};

export const OrderService = {
  createOrder,
  getMyOrders,
  getOrderById,
  getProviderOrders,
  updateOrderStatus,
  cancelOrder,
};
