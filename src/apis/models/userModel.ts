import mongoose from "mongoose";
import validator from "validator"


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is Required'],
  },
  email: {
    type: String,
    required: [true, 'Email is Required'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please Enter valid Email']
  },
  password: {
    type: String,
    unique: true,
    required: [true, 'Password is Required']
  },
  profileImage: String,
  pofileThumbImage: String,
  accountCreatedDate: {
    type: Date,
    default: new Date().toDateString()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
})


const user = mongoose.model('user', userSchema)

export default user
