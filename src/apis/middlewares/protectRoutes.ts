import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/asyncErrorHandler";
import jwt, { JwtPayload } from "jsonwebtoken"
import User from "../models/userModel";
import user from "../interfaces/userInterface";



const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // 1- Read the Token & check if it exist
  const testToken: string = req.headers.authorization
  let token: string
  if (testToken && testToken.startsWith('bearer')) {
    token = testToken.split(' ')[1]
  }

  if (!token) {
    throw new Error("You are not loggedIn")
  }
  // 2- validate the token
  const decodedToken = await jwt.verify(token, process.env.SECRET_STR)
  // 3- if the user exists 
  const decodedPayload = decodedToken as JwtPayload;
  const userId = decodedPayload.id

  const checkUser: user = await User.findById(userId)
  if (!checkUser) {
    throw new Error("user does not exist")
  }

  // 4- if the user changed password after the token was issued

  // 5- allow access to the routes

  next()
})

const requireAdmin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // 1- Read the Token & check if it exist
  const testToken: string = req.headers.authorization
  let token: string
  if (testToken && testToken.startsWith('bearer')) {
    token = testToken.split(' ')[1]
  }

  if (!token) {
    throw new Error("You are not loggedIn")
  }

  // 2- validate the token
  const decodedToken = await jwt.verify(token, process.env.SECRET_STR)

  //3 - check admin required 

  const decodedPayload = decodedToken as JwtPayload;
  const isAdmin = decodedPayload.isAdmin
  if (!isAdmin) {
    throw new Error("Unauthorized Access: Admin Access Required")
  }

  next()
})


export {
  protect,
  requireAdmin
}