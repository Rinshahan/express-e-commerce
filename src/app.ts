import express, { Express, Request, Response } from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import productRouter from "./apis/routes/productRoutes";
import userAuthRouter from "./apis/routes/userAuthRoutes";
import cors from 'cors'
import adminRoutes from "./apis/routes/adminRoutes";
import orderRoutes from "./apis/routes/orderRoutes";
import { productImageUpload } from "./apis/middlewares/multer";
//import { productImageUpload } from "./apis/middlewares/multer";


const app: Express = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(productImageUpload)
app.use('/api/admin', productRouter, adminRoutes)
// app.post('/upload', (req, res) => {
//   console.log(req.body);

// })
app.use('/api/users', userAuthRouter, productRouter, orderRoutes)



export default app