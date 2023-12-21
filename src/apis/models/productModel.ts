import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is Required'],
    unique: true
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

const Product = mongoose.model<Product>('Product', productSchema)

export default Product