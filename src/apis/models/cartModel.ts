import mongoose from "mongoose";
import Cart from "../interfaces/cartInterface";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  product: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Product'
    }
  ],
  totalPrice: {
    type: Number,
    default: 0
  }
})



const cart = mongoose.model<Cart>('Cart', cartSchema)

export default cart