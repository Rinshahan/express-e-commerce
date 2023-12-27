import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/asyncErrorHandler";
const protect = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // Read the Token & check if it exist

  next()
})

export default protect