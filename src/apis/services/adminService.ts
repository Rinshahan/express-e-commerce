import { ObjectId } from "mongoose"
import User from "../models/userModel"
import Product from "../models/productModel"
import user from "../interfaces/userInterface"
import { Products } from "../interfaces/productInterface"

const getUserService = async (): Promise<user[]> => {
  return await User.find()
}

const getUserById = async (userId: string): Promise<user> => {
  const user = await User.findById(userId)
  if (!user) {
    throw new Error("No User Found")
  } else {
    return user
  }
}

const createProduct = async (productData: Products): Promise<Products> => {
  const createdProduct: Products = await Product.create(productData)
  if (!createdProduct) {
    throw new Error("Something went wrong")
  } else {
    return createdProduct
  }
}

const updateProduct = async (productId: string, productData: Products): Promise<Products> => {
  const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true })
  return updatedProduct
}

const deleteProduct = async (productId: string): Promise<any> => {
  await Product.findByIdAndDelete(productId)
}

const getProductCategory = async (productCategory: any): Promise<Products[]> => {
  const category = productCategory
  const product: Products[] = await Product.find({ category })
  if (product.length === 0) {
    throw new Error("No Products Found")
  } else {
    return product
  }
}

export {
  getUserService,
  getUserById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductCategory
}