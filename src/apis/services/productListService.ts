
import { ObjectId } from "mongoose"
import { getProductByIds } from "../services/productService"
import Cart from "../interfaces/cartInterface"




const addProduct = async (userId: string, productId: string, listModel: any): Promise<Product> => {
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
      existingCart.totalPrice += product.price

      await existingCart.save()
      return existingCart
    }
  } else {
    // if no existing cart then
    const newCart = await listModel.create({ user: userId, product: [productId], totalPrice: product.price })
    return newCart
  }
}


const getProduct = async (userId: string, listModel: any): Promise<Cart> => {
  const getCart = await listModel.findOne({ user: userId })
  if (!getCart) {
    throw new Error("No Cart Found")
  } else {
    if (getCart.product.length === 0) {
      throw new Error("No Products Found")
    }
    return getCart
  }
}

const deleteProduct = async (userId: string, productId: string, listModel: any): Promise<void> => {
  const getCart = await listModel.findOne({ user: userId })
  if (!getCart) {
    throw new Error(`${listModel} not found`)
  } else {
    const indexToIndelete = getCart.product.indexOf(productId)
    console.log(indexToIndelete);

    const removeProduct = getCart.product[indexToIndelete]
    getCart.product.splice(indexToIndelete, 1)
    const price = (await getProductByIds(removeProduct)).price as unknown as number
    getCart.totalPrice -= price
    await getCart.save()
  }
}

export {
  addProduct,
  getProduct,
  deleteProduct
}