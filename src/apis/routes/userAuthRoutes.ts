import express from "express"
import { signUpUser, loginUser, logoutUser } from "../controllers/userAuthController"

const userAuthRouter = express.Router()


userAuthRouter.route('/register')
  .post(signUpUser)

userAuthRouter.route('/login')
  .post(loginUser)

userAuthRouter.route('/logout')
  .get(logoutUser)
export default userAuthRouter