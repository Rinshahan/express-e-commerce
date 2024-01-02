
import mongoose from "mongoose";
import Order from "../interfaces/orderInterface";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: {
        type: Number,
        default: 0
      }
    }
  ],

  purchaseDate: {
    type: Date,
    default: Date.now
  },
  orderId: {
    type: String,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  totalItems: {
    type: Number,
    required: true
  }
})

const Orders = mongoose.model<Order>('Orders', orderSchema)

export default Orders