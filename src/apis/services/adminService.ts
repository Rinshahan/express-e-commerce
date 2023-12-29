import { ObjectId } from "mongoose"
import User from "../models/userModel"
import Product from "../models/productModel"

const getUserService = async (): Promise<User[]> => {
  return await User.find()
}

const getUserById = async (userId: string): Promise<User> => {
  const user = await User.findById(userId)
  if (!user) {
    throw new Error("No User Found")
  } else {
    return user
  }
}

const createProduct = async (productData: Product): Promise<Product> => {
  const createdProduct: Product = await Product.create(productData)
  if (!createdProduct) {
    throw new Error("Something went wrong")
  } else {
    return createdProduct
  }
}

const updateProduct = async (productId: string, productData: Product): Promise<Product> => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true })
  return updatedProduct
}

const deleteProduct = async (productId: string): Promise<any> => {
  await Product.findByIdAndDelete(productId)
}

export {
  getUserService,
  getUserById,
  createProduct,
  updateProduct,
  deleteProduct
}