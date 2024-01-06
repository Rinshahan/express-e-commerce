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
exports.loginAdmin = exports.getCategory = exports.deleteProductById = exports.updateProductById = exports.createProductByAdmin = exports.getUsersById = exports.getUsers = void 0;
const adminService_1 = require("../services/adminService");
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const productService_1 = require("../services/productService");
const AuthService_1 = require("../services/AuthService");
//login
const loginAdmin = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log(process.env.ADMIN_PASSWORD);
    if (!username && !password) {
        throw new Error("Please Provide Username or Password");
    }
    else {
        const token = yield (0, AuthService_1.authenticateAdmin)(username, password);
        if (!token) {
            res.status(401).json({
                status: "Hey This is not admin"
            });
        }
        res.status(200).json({
            status: "Login Successfull",
            token
        });
    }
}));
exports.loginAdmin = loginAdmin;
const getUsers = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, adminService_1.getUserService)();
    res.status(200).json({
        status: "success",
        data: {
            users
        }
    });
}));
exports.getUsers = getUsers;
const getUsersById = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, adminService_1.getUserById)(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            user
        }
    });
}));
exports.getUsersById = getUsersById;
const createProductByAdmin = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, productService_1.createProduct)(req.body);
    res.status(200).json({
        status: "success",
        data: {
            product
        }
    });
}));
exports.createProductByAdmin = createProductByAdmin;
const updateProductById = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield (0, adminService_1.updateProduct)(req.params.id, req.body);
    res.status(200).json({
        status: "updated",
        data: {
            updatedProduct
        }
    });
}));
exports.updateProductById = updateProductById;
const deleteProductById = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, adminService_1.deleteProduct)(req.params.id);
    res.status(200).json({
        status: "deleted"
    });
}));
exports.deleteProductById = deleteProductById;
const getCategory = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, adminService_1.getProductCategory)(req.query.category);
    res.status(200).json({
        status: "success",
        data: {
            products
        }
    });
}));
exports.getCategory = getCategory;
