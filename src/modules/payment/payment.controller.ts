import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { PaymentService } from "./payment.service";

const initPayment = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.orderId as string;
  const gatewayUrl = await PaymentService.initPayment(orderId);
  res.send({ url: gatewayUrl });
});

const paymentSuccess = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.orderId as string;
  await PaymentService.paymentSuccess(orderId);
  res.redirect(`${process.env.CLIENT_URL}/orders?payment=success`);
});

const paymentFail = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.orderId as string;
  await PaymentService.paymentFail(orderId);
  res.redirect(`${process.env.CLIENT_URL}/orders?payment=failed`);
});

const paymentCancel = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.orderId as string;
  await PaymentService.paymentFail(orderId);
  res.redirect(`${process.env.CLIENT_URL}/orders?payment=cancelled`);
});

const initStripePayment = catchAsync(async (req: Request, res: Response) => {
  const orderId = req.params.orderId as string;
  const url = await PaymentService.initStripePayment(orderId);
  res.send({ url });
});

export const PaymentController = {
  initPayment,
  paymentSuccess,
  paymentFail,
  paymentCancel,
  initStripePayment,
};
