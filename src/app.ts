import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import productRouter from "./apis/routes/productRoutes";
import userAuthRouter from "./apis/routes/userAuthRoutes";
import cors from 'cors'
import adminRoutes from "./apis/routes/adminRoutes";
const app: Express = express()
//app.use(cors())
app.use(express.json())

app.use(morgan('dev'))
app.use('/api/users', userAuthRouter, productRouter)
app.use('/api/admin', productRouter, adminRoutes)

export default app