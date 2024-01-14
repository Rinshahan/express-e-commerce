import express from "express"
import { orderProduct } from "../controllers/orderController"

const orderRoutes = express.Router()

orderRoutes.route('/:id/orders').get(orderProduct)

export default orderRoutes

