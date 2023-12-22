import catchAsync from "../utils/asyncErrorHandler";
import Product from "../models/productModel";
import { Request, Response } from "express";
import Wishlist from "../models/wishListModel";





const addProductWishList = catchAsync(async (req: Request, res: Response) => {
  const productId = req.body.product;
  const userId = req.params.id;
  //check product exist
  const wishlistProduct = await Product.findById(productId)
  //checking existing wishlist and existing product in the wishlist
  const existingWishLists = await Wishlist.findOne({ user: userId })
  const existingProduct = await Wishlist.findOne({ user: userId, wishListProducts: productId })
  if (!wishlistProduct) {
    throw new Error("Product not Found")
  }
  // if existing wishlist exist then push into exist product
  if (existingWishLists) {
    //checking if existing product in the wishlist if exist dont push it
    if (existingProduct) {
      throw new Error("Product Already exist")
    } else {
      //if no existing product then push and save
      existingWishLists.wishListProducts.push(productId)
      await existingWishLists.save()
      res.status(200).json({
        status: "succesfull",
        data: {
          existingWishLists
        }
      })
    }
    // if no existing wishlist then create it!!
  } else {
    if (existingProduct) {
      throw new Error("Product Already exist")
    } else {
      const newWishList = await Wishlist.create({ user: userId, wishListProducts: [productId] })
      res.status(200).json({
        status: 'Success',
        data: {
          newWishList
        }
      })
    }
  }
})


const getProductWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id
  const wishlistProduct = await Wishlist.find({ user: userId })
  if (!wishlistProduct) {
    throw new Error("no products")
  } else {
    res.status(200).json({
      status: "success",
      data: {
        wishlistProducts: wishlistProduct
      }
    })
  }
})

const deleteProductWishlist = catchAsync(async (req: Request, res: Response) => {
  const userId = req.params.id;
  const productId = req.body.product

  const checkWishlist = await Wishlist.findOne({ user: userId })

  if (!checkWishlist) {
    throw new Error("Error not found")
  } else {
    const indexToDelete = await checkWishlist.wishListProducts.indexOf(productId)
    console.log(indexToDelete);
    checkWishlist.wishListProducts.splice(indexToDelete, 1)
    await checkWishlist.save()
    res.status(200).json({
      status: "success"
    })
  }



})

export {
  addProductWishList,
  getProductWishlist,
  deleteProductWishlist
}