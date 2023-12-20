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
exports.loginUser = exports.signUpUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const customError_1 = __importDefault(require("../utils/customError"));
const jsonwebtoken_1 = __importDefault(require("../utils/jsonwebtoken"));
exports.signUpUser = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = yield userModel_1.default.create(req.body);
    const token = (0, jsonwebtoken_1.default)(newUser.email);
    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser
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
    // check user exists with username
    const loginUser = yield userModel_1.default.findOne({ username }).select('+password');
    const token = (0, jsonwebtoken_1.default)(loginUser.email);
    if (!loginUser || !(yield loginUser.comparePasswordinDb(password, loginUser.password))) {
        throw new Error("Incorrect username or Password");
    }
    else {
        res.status(200).json({
            status: "success",
            token,
            user: loginUser
        });
    }
}));
