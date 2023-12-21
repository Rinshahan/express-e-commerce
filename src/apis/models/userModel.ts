import mongoose from "mongoose";
import validator from "validator"
import bcryptjs from "bcryptjs"




const userSchema = new mongoose.Schema({
  username: {
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
    required: [true, 'Password is Required'],
    select: false
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

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next()
  }
  this.password = await bcryptjs.hash(this.password, 12)
  next()
})

userSchema.methods.comparePasswordinDb = async (password: any, passwordDB: string) => {
  return await bcryptjs.compare(password, passwordDB)
}


const user = mongoose.model<User>('user', userSchema)

export default user
