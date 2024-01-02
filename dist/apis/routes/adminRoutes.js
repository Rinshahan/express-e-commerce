"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const protectRoutes_1 = require("../middlewares/protectRoutes");
const adminRoutes = express_1.default.Router();
adminRoutes.route('/login')
    .post(adminController_1.loginAdmin);
adminRoutes.route('/users')
    .get(protectRoutes_1.requireAdmin, adminController_1.getUsers);
adminRoutes.route('/users/:id')
    .get(protectRoutes_1.requireAdmin, adminController_1.getUsersById);
adminRoutes.route('/product')
    .get(protectRoutes_1.requireAdmin, adminController_1.getCategory);
exports.default = adminRoutes;
