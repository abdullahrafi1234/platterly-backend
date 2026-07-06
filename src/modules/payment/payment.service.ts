import SSLCommerzPayment from "sslcommerz-lts";
import Stripe from "stripe";
import prisma from "../../config/db";

const store_id = process.env.SSLCOMMERZ_STORE_ID as string;
const store_passwd = process.env.SSLCOMMERZ_STORE_PASSWORD as string;
const is_live = process.env.SSLCOMMERZ_IS_LIVE === "true";

const initPayment = async (orderId: string) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: { customer: true },
  });

  if (!order) throw new Error("Order not found");

  const data = {
    total_amount: order.totalAmount,
    currency: "BDT",
    tran_id: orderId,
    success_url: `${process.env.SERVER_URL}/api/payment/success/${orderId}`,
    fail_url: `${process.env.SERVER_URL}/api/payment/fail/${orderId}`,
    cancel_url: `${process.env.SERVER_URL}/api/payment/cancel/${orderId}`,
    shipping_method: "Courier",
    product_name: "Platterly Order",
    product_category: "Food",
    product_profile: "general",
    cus_name: order.customer.name,
    cus_email: order.customer.email,
    cus_add1: order.deliveryAddress,
    cus_city: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: order.customer.phone || "01700000000",
    ship_name: order.customer.name,
    ship_add1: order.deliveryAddress,
    ship_city: "Dhaka",
    ship_postcode: "1000",
    ship_country: "Bangladesh",
  };

  const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live);
  const apiResponse = await sslcz.init(data);

  return apiResponse.GatewayPageURL;
};

const paymentSuccess = async (orderId: string) => {
  await prisma.order.update({
    where: { id: orderId },
    data: { paymentStatus: "PAID", paymentMethod: "SSLCOMMERZ" },
  });
};

const paymentFail = async (orderId: string) => {
  await prisma.order.update({
    where: { id: orderId },
    data: { paymentStatus: "FAILED" },
  });
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

const initStripePayment = async (orderId: string) => {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order) throw new Error("Order not found");

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: "Platterly Order" },
          unit_amount: Math.round(order.totalAmount * 100),
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.CLIENT_URL}/orders?payment=success`,
    cancel_url: `${process.env.CLIENT_URL}/orders?payment=cancelled`,
    metadata: { orderId },
  });

  return session.url;
};

export const PaymentService = {
  initPayment,
  paymentSuccess,
  paymentFail,
  initStripePayment,
};
