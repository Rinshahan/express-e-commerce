import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/asyncErrorHandler";
import Orders from "../models/orderModel";
import { orderAProduct } from "../services/orderService";
import cart from "../models/cartModel";
import Stripe from "stripe";

const orderProduct = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const findCart = await cart.findOne({ user: userId })
  const session = await orderAProduct(findCart)
  if (session) {
    await cart.deleteOne({ user: userId })
    res.status(200).json({
      status: "success",
      session: session.url
    })
  }
  else {
    res.status(500).json({
      status: "failed"
    })
  }
})

export {
  orderProduct
}