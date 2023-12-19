import express from "express"
import { signUpUser } from "../controllers/authController"

const authRouter = express.Router()
authRouter.route('/register').post(signUpUser)

export default authRouter