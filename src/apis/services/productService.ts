import { ObjectId } from "mongoose"
import Product from "../models/productModel"

const createProduct = async (productData: Product): Promise<Product> => {
  const newProduct = await Product.create(productData)
  return newProduct
}

const getAllProducts = async (): Promise<Product[]> => {
  const allProducts = await Product.find()
  return allProducts
}

const getProductByIds = async (productId: ObjectId): Promise<Product | undefined> => {
  return await Product.findById(productId)
}

const productByCategory = async (category: string): Promise<Product[]> => {
  const productsByCategory = await Product.find({ category })
  if (productsByCategory.length === 0) {
    throw new Error("Category is not found!!")
  } else {
    return productsByCategory
  }
}


const checkProductExist = async (productId: ObjectId): Promise<boolean> => {
  const getProduct = await Product.findById(productId)
  if (getProduct) {
    return true
  } else {
    false
  }
}

export {
  createProduct,
  getAllProducts,
  getProductByIds,
  productByCategory,
  checkProductExist
}