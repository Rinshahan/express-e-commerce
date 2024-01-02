import express from "express";
import { addProductWishList, deleteProductWishlist, getProductWishlist } from "../controllers/wishListController";
import { getProduct, getProductByCategory, getProductById } from "../controllers/productController";
import { addProductCart, deleteProductCart, getProductCart } from "../controllers/cartController";
import protect from "../middlewares/protectRoutes";
import { createProductByAdmin, deleteProductById, getCategory, updateProductById } from "../controllers/adminController";
const productRouter = express.Router()
productRouter.route('/products')
  .post(createProductByAdmin)
  .get(getProduct)


productRouter.route('/product/:id')
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById)

productRouter.route('/:id/wishlists')
  .post(addProductWishList)
  .get(getProductWishlist)
  .delete(deleteProductWishlist)


productRouter.route('/product/category/:category')
  .get(getProductByCategory)

productRouter.route('/:id/cart')
  .post(addProductCart)
  .get(getProductCart)
  .delete(deleteProductCart)

export default productRouter