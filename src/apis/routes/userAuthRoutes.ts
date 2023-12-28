import express from "express"
import { signUpUser, loginUser } from "../controllers/userAuthController"

const userAuthRouter = express.Router()


userAuthRouter.route('/register')
  .post(signUpUser)

userAuthRouter.route('/login')
  .post(loginUser)

export default userAuthRouter