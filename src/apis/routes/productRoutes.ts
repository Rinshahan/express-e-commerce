import express from "express";
import { addProductWishList, deleteProductWishlist, getProductWishlist } from "../controllers/wishListController";
import { getProduct, getProductByCategory, getProductById } from "../controllers/productController";
const productRouter = express.Router()
productRouter.route('/product').get(getProduct)
productRouter.route('/product/:id').get(getProductById)
productRouter.route('/:id/wishlists').post(addProductWishList).get(getProductWishlist).delete(deleteProductWishlist)
productRouter.route('/product/category/:category').get(getProductByCategory)

export default productRouter