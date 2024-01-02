import express, { Request, Response } from "express";
import catchAsync from "../utils/asyncErrorHandler";
import User from "../models/userModel";
import { getCategory, getUsers, getUsersById } from "../controllers/adminController";

const adminRoutes = express.Router()

adminRoutes.route('/users')
  .get(getUsers)

adminRoutes.route('/users/:id')
  .get(getUsersById)

adminRoutes.route('/product')
  .get(getCategory)


export default adminRoutes