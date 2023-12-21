"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userAuthController_1 = require("../controllers/userAuthController");
const authRouter = express_1.default.Router();
authRouter.route('/register').post(userAuthController_1.signUpUser);
authRouter.route('/login').post(userAuthController_1.loginUser);
exports.default = authRouter;
