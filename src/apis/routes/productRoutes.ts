import express from "express";
import { CreateProduct } from "../controllers/productController";
const productRouter = express.Router()

productRouter.route('/product').post(CreateProduct)