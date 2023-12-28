import catchAsync from "../utils/asyncErrorHandler";

import { Request, Response } from "express";
import Wishlist from "../models/wishListModel";
import { addProduct, deleteProduct, getProduct } from "../services/productListService";


const addProductWishList = catchAsync(async (req: Request, res: Response) => {
  const productId = req.body.product;
  const userId = req.params.id;
  const updatedWishList = await addProduct(userId, productId, Wishlist)
  res.status(200).json({
    status: 'success',
    data: {
      updatedWishList
    }
  })
})


const getProductWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const getWishList = await getProduct(userId, Wishlist)
  res.status(200).json({
    status: "success",
    data: {
      getWishList
    }
  })
})

const deleteProductWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const productId = req.body.product

  deleteProduct(userId, productId, Wishlist)
  res.status(200).json({
    status: "success"
  })



})

export {
  addProductWishList,
  getProductWishlist,
  deleteProductWishlist
}