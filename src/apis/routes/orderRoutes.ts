import express from "express"
import { orderProduct } from "../controllers/orderController"

const orderRoutes = express.Router()

orderRoutes.route('/:id/orders').post(orderProduct)

export default orderRoutes

