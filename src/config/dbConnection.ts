import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config({ path: './config.env' })

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.LOCAL_CONN_STR ?? 'mongodb://localhost:27017/ecommerce')
    console.log(`MongoDB Connected : ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
  };
}

export default connectDB