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
exports.requireAdmin = exports.protect = void 0;
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const protect = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1- Read the Token & check if it exist
    const testToken = req.headers.authorization;
    let token;
    if (testToken && testToken.startsWith('bearer')) {
        token = testToken.split(' ')[1];
    }
    if (!token) {
        throw new Error("You are not loggedIn");
    }
    // 2- validate the token
    const decodedToken = yield jsonwebtoken_1.default.verify(token, process.env.SECRET_STR);
    // 3- if the user exists 
    const decodedPayload = decodedToken;
    const userId = decodedPayload.id;
    const checkUser = yield userModel_1.default.findById(userId);
    if (!checkUser) {
        throw new Error("user does not exist");
    }
    // 4- if the user changed password after the token was issued
    // 5- allow access to the routes
    next();
}));
exports.protect = protect;
const requireAdmin = (0, asyncErrorHandler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 1- Read the Token & check if it exist
    const testToken = req.headers.authorization;
    let token;
    if (testToken && testToken.startsWith('bearer')) {
        token = testToken.split(' ')[1];
    }
    if (!token) {
        throw new Error("You are not loggedIn");
    }
    // 2- validate the token
    const decodedToken = yield jsonwebtoken_1.default.verify(token, process.env.SECRET_STR);
    //3 - check admin required 
    const decodedPayload = decodedToken;
    const isAdmin = decodedPayload.isAdmin;
    if (!isAdmin) {
        throw new Error("Unauthorized Access: Admin Access Required");
    }
    next();
}));
exports.requireAdmin = requireAdmin;
