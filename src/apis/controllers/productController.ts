import catchAsync from "../utils/asyncErrorHandler";
import Product from "../models/productModel";
import { Request, Response } from "express";
import Wishlist from "../models/wishListModel";
import { isAwaitKeyword } from "typescript";
import { log } from "console";


// const CreateProduct = catchAsync(async (req, res) => {
//   const newProduct = await product.create(req.body)
//   res.status(200).json({
//     status: "success",
//     data: {
//       newProduct
//     }
//   })
// })


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

const addProductToWishList = catchAsync(async (req: Request, res: Response) => {

  //assume userid and product id

  const productId = req.body.product
  const userId = req.params.id

  // find products by id
  const userProduct = await Product.findById(productId)

  if (!userProduct) {
    throw new Error("Product not Found");
  }
  // checking if product already exist
  const existingWishlists = await Wishlist.findOne({ user: userId, product: productId })
  if (existingWishlists) {
    throw new Error("Product Already Exists")
  } else {
    //storing into the db
    const newWIshlistItems = await Wishlist.create({ user: userId, product: productId })
    res.status(200).json({
      status: "success",
      data: {
        newWIshlistItems
      }
    })
  }
})

export {
  //CreateProduct
  getProduct,
  getProductById,
  getProductByCategory,
  addProductToWishList
}