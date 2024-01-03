"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const orderRoutes = express_1.default.Router();
orderRoutes.route('/:id/orders').post(orderController_1.orderProduct);
exports.default = orderRoutes;
