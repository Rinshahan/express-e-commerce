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
exports.authenticateAdmin = exports.authenticateUser = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("../utils/jsonwebtoken"));
const jsonwebtoken_2 = __importDefault(require("jsonwebtoken"));
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    return userModel_1.default.create(userData);
});
exports.createUser = createUser;
const authenticateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findOne({ username }).select('+password');
    if (!user || !(yield user.comparePasswordinDb(password, user.password))) {
        throw new Error("Incorrect username or password");
    }
    const token = (0, jsonwebtoken_1.default)(user.id);
    return { user, token };
});
exports.authenticateUser = authenticateUser;
const authenticateAdmin = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    if (username === process.env.ADMIN_USERNAME && password === process.env.ADMIN_PASSWORD) {
        const token = jsonwebtoken_2.default.sign({ username, isAdmin: true, role: 'admin' }, process.env.SECRET_STR, { expiresIn: 60 * 60 * 24 });
        return token;
    }
});
exports.authenticateAdmin = authenticateAdmin;
