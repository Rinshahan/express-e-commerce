import { Request, Response } from "express";
import User from "../models/userModel";
import { deleteProduct, getProductCategory, getUserById, getUserService, updateProduct } from "../services/adminService";
import catchAsync from "../utils/asyncErrorHandler";
import { createProduct } from "../services/productService";
import generateToken from "../utils/jsonwebtoken";
import { authenticateAdmin } from "../services/AuthService";
import user from "../interfaces/userInterface";

//login

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const { username, password } = req.body
  console.log(process.env.ADMIN_PASSWORD);

  if (!username && !password) {
    throw new Error("Please Provide Username or Password")
  } else {
    const token = await authenticateAdmin(username, password)
    if (!token) {
      res.status(401).json({
        status: "Hey This is not admin"
      })
    }
    res.status(200).json({
      status: "Login Successfull",
      token
    })
  }
})

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users: user[] = await getUserService()
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
  getCategory,
  loginAdmin
}