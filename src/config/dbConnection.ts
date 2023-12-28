import mongoose from "mongoose";
import dotenv from "dotenv"
import path from "path"





//console.log(dotenv.config({ path: path.join(__dirname, 'config.env') }));
console.log(dotenv.config({ path: './config.env' }));

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.LOCAL_CONN_STR)
    console.log(`MongoDB Connected : ${connect.connection.host}`);
  } catch (err) {
    console.log(err);
  };
}

export default connectDB