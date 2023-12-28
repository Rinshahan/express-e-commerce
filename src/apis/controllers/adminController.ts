import { Request, Response } from "express";
import User from "../models/userModel";
import { getUserService } from "../services/adminService";
import catchAsync from "../utils/asyncErrorHandler";

const getUsers = catchAsync(async (req: Request, res: Response) => {
  const users: User[] = await getUserService()
  console.log(users);
  res.status(200).json({
    status: "success",
    data: {
      users
    }
  })
})

const getUsersById = catchAsync(async (req: Request, res: Response) => {

})



export {
  getUsers,
  getUsersById
}