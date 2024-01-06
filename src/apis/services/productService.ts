import { ObjectId } from "mongoose"
import Product from "../models/productModel"


const createProduct = async (productData: Product): Promise<Product> => {
  const newProduct: Product = await Product.create(productData)
  return newProduct
}

const getAllProducts = async (): Promise<Product[]> => {
  const allProducts: Product[] = await Product.find()
  return allProducts
}

const getProductByIds = async (productId: string): Promise<Product | undefined> => {
  const productById: Product = await Product.findById(productId)
  if (!productById) {
    throw new Error("No Product Found")
  } else {
    return productById
  }
}

const productByCategory = async (category: string): Promise<Product[]> => {
  const productsByCategory: Product[] = await Product.find({ category })
  if (productsByCategory.length === 0) {
    throw new Error("Category is not found!!")
  } else {
    return productsByCategory
  }
}


const checkProductExist = async (productId: ObjectId): Promise<boolean> => {
  const getProduct: Product = await Product.findById(productId)
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