import app from "./app";
import connectDB from "./config/dbConnection";
const port: number = 9000

connectDB()

app.listen(port, () => {
  console.log(`Listening to ${port}`);
})