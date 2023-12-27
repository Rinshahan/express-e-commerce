import { Request, Response } from "express";
import catchAsync from "../utils/asyncErrorHandler";
import Product from "../models/productModel";
import Cart from "../models/cartModel";

const addProductCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const productId = req.body.product
  const checkProduct = await Product.findById(productId)
  const existCart = await Cart.findOne({ user: userId })
  const existProduct = await Cart.findOne({ user: userId, product: productId })
  if (!checkProduct) {
    throw new Error("Product not Found")
  }

  if (existCart) {
    if (existProduct) {
      throw new Error("Product Already Exist in the Cart")
    } else {
      existCart.product.push(productId)
      existCart.save()
      res.status(200).json({
        status: "success",
        data: {
          existCart
        }
      })
    }
  } else {
    if (existProduct) {
      throw new Error("Product Already Exist in the Cart")
    } else {
      const newCart = await Cart.create({ user: userId, product: productId })
      res.status(200).json({
        status: "success",
        data: {
          newCart
        }
      })
    }
  }
})

const getProductCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const getCart = await Cart.findOne({ user: userId })

  if (!getCart) {
    throw new Error("No Products Found")
  }
  else {
    res.status(200).json({
      status: "success",
      data: {
        getCart
      }
    })
  }
})

const deleteProductCart = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const productId = req.body.product

  const getCart = await Cart.findOne({ user: userId })

  if (!getCart) {
    throw new Error("Cart is not found")
  } else {
    const indexToDelete = getCart.product.indexOf(productId)
    getCart.product.splice(indexToDelete, 1)
    await getCart.save()
    res.status(200).json({
      status: "success"
    })
  }

})


export {
  addProductCart,
  getProductCart,
  deleteProductCart
}