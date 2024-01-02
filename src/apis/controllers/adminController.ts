import { Request, Response } from "express";
import User from "../models/userModel";
import { deleteProduct, getProductCategory, getUserById, getUserService, updateProduct } from "../services/adminService";
import catchAsync from "../utils/asyncErrorHandler";
import { createProduct } from "../services/productService";

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users: User[] = await getUserService()
  console.log(users);
  res.status(200).json({
    status: "success",
    data: {
      users
    }
  })
})

const getUsersById = catchAsync(async (req: Request, res: Response) => {
  const user = await getUserById(req.params.id)
  res.status(200).json({
    status: "success",
    data: {
      user
    }
  })
})


const createProductByAdmin = catchAsync(async (req: Request, res: Response) => {
  const product: Product = await createProduct(req.body)
  res.status(200).json({
    status: "success",
    data: {
      product
    }
  })
})


const updateProductById = catchAsync(async (req: Request, res: Response) => {
  const updatedProduct = await updateProduct(req.params.id, req.body)
  res.status(200).json({
    status: "updated",
    data: {
      updatedProduct
    }
  })
})


const deleteProductById = catchAsync(async (req: Request, res: Response) => {
  await deleteProduct(req.params.id)
  res.status(200).json({
    status: "deleted"
  })
})

const getCategory = catchAsync(async (req: Request, res: Response) => {
  const products: Product[] = await getProductCategory(req.query.category)




  res.status(200).json({
    status: "success",
    data: {
      products
    }
  })
})

export {
  getUsers,
  getUsersById,
  createProductByAdmin,
  updateProductById,
  deleteProductById,
  getCategory
}