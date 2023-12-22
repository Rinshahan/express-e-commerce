import catchAsync from "../utils/asyncErrorHandler"
import Product from "../models/productModel"
import { Request, Response } from "express"


const CreateProduct = catchAsync(async (req: Request, res: Response) => {
  const newProduct = await Product.create(req.body)
  res.status(200).json({
    status: "success",
    data: {
      newProduct
    }
  })
})

const getProduct = catchAsync(async (req: Request, res: Response) => {
  const products = await Product.find()
  res.status(200).json({
    status: "success",
    data: {
      products
    }
  })
})

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const productById = await Product.findById(req.params.id)
  res.status(200).json({
    status: "success",
    data: {
      productById
    }
  })
})

const getProductByCategory = catchAsync(async (req: Request, res: Response) => {
  const category = req.params.category
  const productByCategory = await Product.find({ category })
  if (productByCategory.length === 0) {
    throw new Error("Category is not found!!")
  } else {
    res.status(200).json({
      status: "successfull",
      data: {
        productByCategory
      }
    })
  }
})

export {
  CreateProduct,
  getProduct,
  getProductById, getProductByCategory
}