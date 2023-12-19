import { NextFunction, Request, Response } from "express";
import user from "../models/userModel";
import asyncErrorHandler from "../utils/asyncErrorHandler";
import jsonwebtoken from "jsonwebtoken"


export const signUpUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const newUser = await user.create(req.body);
    const token =
      res.status(201).json({
        status: "success",
        data: {
          user: newUser
        }
      });
  } catch (err: any) {
    res.status(500).json({
      status: "failed",
      message: err.message
    })
  }
};


