import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import productRouter from "./apis/routes/productRoutes";
import userAuthRouter from "./apis/routes/userAuthRoutes";
import cors from 'cors'
const app: Express = express()
//app.use(cors())
app.use(express.json())

app.use(morgan('dev'))
app.use('/api/users', userAuthRouter, productRouter)
app.use('api/admin', productRouter)

// app.use((error: any, req: Request, res: Response, next: Function) => {
//   error.statusCode = error.statusCode || 500
//   error.status = error.status || 'error'
//   req.status(error.statusCode).json({
//     status: error.statusCode,
//     message: error.message
//   })
// })
export default app