import { ref, required } from "joi"
import mongoose from "mongoose"
import WishList from "../interfaces/wishListInterface"

const wishlistSchema = new mongoose.Schema({
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
  ]

})

const Wishlist = mongoose.model<WishList>('Wishlist', wishlistSchema)

export default Wishlist