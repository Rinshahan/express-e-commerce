import express from "express"
import { signUpUser, loginUser } from "../controllers/userAuthController"

const authRouter = express.Router()
authRouter.route('/register').post(signUpUser)
authRouter.route('/login').post(loginUser)

export default authRouter