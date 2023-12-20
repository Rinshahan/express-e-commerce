import express from "express"
import { signUpUser, loginUser } from "../controllers/authController"

const authRouter = express.Router()
authRouter.route('/register').post(signUpUser)
authRouter.route('/login').post(loginUser)

export default authRouter