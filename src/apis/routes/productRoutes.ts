import express from "express";
import { addProductWishList, deleteProductWishlist, getProductWishlist } from "../controllers/wishListController";
import { getProduct, getProductByCategory, getProductById } from "../controllers/productController";
import { addProductCart, deleteProductCart, getProductCart } from "../controllers/cartController";
import { protect, requireAdmin } from "../middlewares/protectRoutes";
import { createProductByAdmin, deleteProductById, getCategory, updateProductById } from "../controllers/adminController";
const productRouter = express.Router()
productRouter.route('/products')
  .post(createProductByAdmin)
  .get(getProduct)


productRouter.route('/product/:id')
  .get(protect, getProductById)
  .put(requireAdmin, updateProductById)
  .delete(requireAdmin, deleteProductById)

productRouter.route('/product/category/:category')
  .get(getProductByCategory)


productRouter.route('/:id/wishlists')
  .post(protect, addProductWishList)
  .get(protect, getProductWishlist)
  .delete(protect, deleteProductWishlist)



productRouter.route('/:id/cart')
  .post(protect, addProductCart)
  .get(protect, getProductCart)
  .delete(protect, deleteProductCart)

export default productRouter