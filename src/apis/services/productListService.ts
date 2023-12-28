
import { ObjectId } from "mongoose"
import { getProductByIds } from "../services/productService"




const addProduct = async (userId: string, productId: ObjectId, listModel: any): Promise<any> => {
  //check product exist
  const product = await getProductByIds(productId)

  if (!product) {
    throw new Error("Product Not Found")
  }
  //checking existing wishlist
  const existingCart = await listModel.findOne({ user: userId })
  if (existingCart) {
    //checking if existing cart's product
    const existingProductInCart = existingCart.product.indexOf(productId)
    if (existingProductInCart !== -1) {
      throw new Error("Product Already Exist in Cart")
    } else {
      //if no existing product push the product
      existingCart.product.push(productId)
      existingCart.save()
      return existingCart
    }
  } else {
    // if no existing cart then
    const newCart = await listModel.create({ user: userId, productId: [productId] })
    return newCart
  }
}


const getProduct = async (userId: string, listModel: any): Promise<any> => {
  const getCart = await listModel.findOne({ user: userId })
  if (!getCart) {
    throw new Error("No Cart Found")
  } else {
    return getCart
  }
}

const deleteProduct = async (userId: string, productId: ObjectId, listModel: any): Promise<void> => {
  const getCart = await listModel.findOne({ user: userId })
  if (!getCart) {
    throw new Error("Cart not found")
  } else {
    const indexToIndelete = getCart.product.indexOf(productId)
    getCart.product.splice(indexToIndelete, 1)
    await getCart.save()
  }
}

export {
  addProduct,
  getProduct,
  deleteProduct
}