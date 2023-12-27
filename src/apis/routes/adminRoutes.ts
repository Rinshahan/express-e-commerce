import { Request, Response } from "express";
import catchAsync from "../utils/asyncErrorHandler";
import User from "../models/userModel";

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const getUsers = await User.find()
  console.log(getUsers);

})