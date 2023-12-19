import express, { Express, Request, Response } from "express";
import userRoutes from "./apis/routes/userRoutes"
import authRouter from "./apis/routes/authRoutes";
import morgan from "morgan";
import bodyParser from "body-parser";

const app: Express = express()
app.use(bodyParser.json()),
  app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use('/api/users', authRouter)

// app.use((error: any, req: Request, res: Response, next: Function) => {
//   error.statusCode = error.statusCode || 500
//   error.status = error.status || 'error'
//   req.status(error.statusCode).json({
//     status: error.statusCode,
//     message: error.message
//   })
// })
export default app