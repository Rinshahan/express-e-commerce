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
exports.deleteProductById = exports.updateProductById = exports.getUsersById = exports.getUsers = void 0;
const adminService_1 = require("../services/adminService");
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const getUsers = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, adminService_1.getUserService)();
    console.log(users);
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
