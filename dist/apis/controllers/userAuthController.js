"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.signUpUser = void 0;
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const customError_1 = __importDefault(require("../utils/customError"));
const jsonwebtoken_1 = __importDefault(require("../utils/jsonwebtoken"));
const AuthService_1 = require("../services/AuthService");
exports.signUpUser = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield (0, AuthService_1.createUser)(req.body);
    const token = (0, jsonwebtoken_1.default)(newUser._id);
    res.status(201).json({
        status: "success",
        token: { token },
        data: {
            User: newUser
        }
    });
}));
exports.loginUser = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    // check email and password present in the body
    if (!username || !password) {
        const error = new customError_1.default('Please Provid Username and Password', 400);
        return next(error);
    }
    const { user, token } = yield (0, AuthService_1.authenticateUser)(username, password);
    res.status(200).json({
        status: "success",
        token,
        user
    });
}));
exports.logoutUser = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        status: "success",
        message: "Logged Out"
    });
}));
