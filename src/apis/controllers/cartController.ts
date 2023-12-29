import { Request, Response } from "express";
import catchAsync from "../utils/asyncErrorHandler";
import { addProduct, deleteProduct, getProduct } from "../services/productListService";
import Cart from "../models/cartModel";



const addProductCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const productId = req.body.product

  const updatedCart = await addProduct(userId, productId, Cart)
  res.status(200).json({
    status: "success",
    data: {
      updatedCart
    }
  })
})




const getProductCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const getCart = await getProduct(userId, Cart)

  res.status(200).json({
    status: "success",
    data: {
      getCart,
      totalPrice: getCart.totalPrice
    }
  })
})

const deleteProductCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const productId = req.body.product
  deleteProduct(userId, productId, Cart)
  res.status(200).json({
    status: "success"
  })

})


export {
  addProductCart,
  getProductCart,
  deleteProductCart
}