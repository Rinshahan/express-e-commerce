import mongoose from "mongoose";
import Cart from "../interfaces/cartInterface";

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  }
})



const Cart = mongoose.model<Cart>('Cart', cartSchema)

export default Cart