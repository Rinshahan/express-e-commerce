import express from "express"

const orderRoutes = express.Router()

orderRoutes.route('/orders').post(orderRoutes)

