import mongoose from "mongoose"

interface Cart {
  user: string,
  product: [string],
  totalPrice: number
}

export default Cart