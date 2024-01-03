import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/asyncErrorHandler";
import Orders from "../models/orderModel";
import { orderAProduct } from "../services/orderService";
import cart from "../models/cartModel";
import Stripe from "stripe";

const orderProduct = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const findCart = await cart.findOne({ user: userId })
  const createOrder = await orderAProduct(findCart)
  await cart.deleteOne({ id: findCart.id })
  res.status(200).json({
    status: "success",
    orders: createOrder
  })
})

export {
  orderProduct
}