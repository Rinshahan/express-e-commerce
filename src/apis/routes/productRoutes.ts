import express from "express";
import { getProduct, getProductByCategory, getProductById } from "../controllers/productController";
const productRouter = express.Router()
productRouter.route('/product').get(getProduct)
productRouter.route('/product/:id').get(getProductById)
productRouter.route('/product/category/:category').get(getProductByCategory)

export default productRouter