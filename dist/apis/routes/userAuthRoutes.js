"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../controllers/userAuthController");
const userAuthRouter = express_1.default.Router();
userAuthRouter.route('/register')
    .post(userAuthController_1.signUpUser);
userAuthRouter.route('/login')
    .post(userAuthController_1.loginUser);
exports.default = userAuthRouter;
