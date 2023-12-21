import mongoose from "mongoose";

interface Order {
  user: mongoose.Schema.Types.ObjectId,
  products: [
    productId: mongoose.Schema.Types.ObjectId,
    quantity: Number
  ],
  purchaseDate: Date,
  orderId: string,
  totalPrice: number,
  totalItems: Number
}

export default Order