"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = require("../controllers/adminController");
const adminRoutes = express_1.default.Router();
adminRoutes.route('/users')
    .get(adminController_1.getUsers);
adminRoutes.route('/users/:id')
    .get(adminController_1.getUsersById);
exports.default = adminRoutes;
