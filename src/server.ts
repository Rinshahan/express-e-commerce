import app from "./app";
import connectDB from "./config/dbConnection";
import { errorHandler } from "./apis/middlewares/errorMiddleware";
const port: number = 9000

connectDB()

app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening to ${port}`);
})

