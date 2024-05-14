import { ObjectId } from "mongoose"
import Product from "../models/productModel"
import { Products } from "../interfaces/productInterface"

const createProduct = async (productData: Products): Promise<Products> => {
  const newProduct: Products = await Product.create(productData)
  return newProduct
}

const getAllProducts = async (): Promise<Products[]> => {
  const allProducts: Products[] = await Product.find()
  return allProducts
}

const getProductByIds = async (productId: string): Promise<Products | undefined> => {
  const productById: Products = await Product.findById(productId)
  if (!productById) {
    throw new Error("No Product Found")
  } else {
    return productById
  }
}

const productByCategory = async (category: string): Promise<Products[]> => {
  const productsByCategory: Products[] = await Product.find({ category })
  if (productsByCategory.length === 0) {
    throw new Error("Category is not found!!")
  } else {
    return productsByCategory
  }
}


const checkProductExist = async (productId: ObjectId): Promise<boolean> => {
  const getProduct: Products = await Product.findById(productId)
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