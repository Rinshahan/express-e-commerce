import mongoose from "mongoose"

interface Cart {
  user: mongoose.Schema.Types.ObjectId,
  product: [mongoose.Schema.Types.ObjectId],
  totalPrice: number
}

export default Cart