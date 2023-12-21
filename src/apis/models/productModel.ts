import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is Required']
  },
  description: {
    type: String,
    required: [true, 'Description is Required']
  },
  price: {
    type: Number,
    required: [true, 'Price is Required']
  },
  image: String,
  category: {
    type: String,
    required: [true, 'Category is Required']
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})

const product = mongoose.model<Product>('product', productSchema)

export default product