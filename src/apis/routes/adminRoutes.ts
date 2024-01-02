import express, { Request, Response } from "express";
import catchAsync from "../utils/asyncErrorHandler";
import User from "../models/userModel";
import { getCategory, getUsers, getUsersById, loginAdmin } from "../controllers/adminController";
import { protect, requireAdmin } from "../middlewares/protectRoutes";

const adminRoutes = express.Router()

adminRoutes.route('/login')
  .post(loginAdmin)

adminRoutes.route('/users')
  .get(requireAdmin, getUsers)

adminRoutes.route('/users/:id')
  .get( requireAdmin, getUsersById)

adminRoutes.route('/product')
  .get( requireAdmin, getCategory)


export default adminRoutes