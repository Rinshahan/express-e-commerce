import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/asyncErrorHandler";
import CustomError from "../utils/customError";
import generateToken from "../utils/jsonwebtoken";
import { authenticateUser, createUser } from "../services/userAuthService";


export const signUpUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const newUser = await createUser(req.body);
  const token = generateToken(newUser.email)
  res.status(201).json({
    status: "success",
    token,
    data: {
      User: newUser
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
  const { user, token } = await authenticateUser(username, password)
  res.status(200).json({
    status: "success",
    token,
    user
  })
})




