import mongoose from "mongoose";

interface WishList {
  user: mongoose.Schema.Types.ObjectId,
  wishListProducts: [mongoose.Schema.Types.ObjectId]
}

export default WishList