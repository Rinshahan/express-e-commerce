import { NextFunction, Request, Response } from "express";
import user from "../models/userModel";
import catchAsync from "../utils/asyncErrorHandler";
import CustomError from "../utils/customError";
import generateToken from "../utils/jsonwebtoken";



export const signUpUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const newUser = await user.create(req.body);
  const token = generateToken(newUser.email)
  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser
    }
  });
})

export const loginUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username
  const password = req.body.password

  // check email and password present in the body
  if (!username || !password) {
    const error = new CustomError('Please Provid Username and Password', 400)
    return next(error)
  }

  // check user exists with username

  const loginUser = await user.findOne({ username }).select('+password')

  const token = generateToken(loginUser.email)

  if (!loginUser || !(await loginUser.comparePasswordinDb(password, loginUser.password))) {
    throw new Error("Incorrect username or Password")
  } else {
    res.status(200).json({
      status: "success",
      token,
      user: loginUser
    })
  }
})



