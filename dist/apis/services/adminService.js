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
exports.deleteProduct = exports.updateProduct = exports.getUserById = exports.getUserService = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const productModel_1 = __importDefault(require("../models/productModel"));
const getUserService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield userModel_1.default.find();
});
exports.getUserService = getUserService;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield userModel_1.default.findById(userId);
    if (!user) {
        throw new Error("No User Found");
    }
    else {
        return user;
    }
});
exports.getUserById = getUserById;
const updateProduct = (productId, productData) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedProduct = yield productModel_1.default.findByIdAndUpdate(productId, productData, { new: true });
    return updatedProduct;
});
exports.updateProduct = updateProduct;
const deleteProduct = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    yield productModel_1.default.findByIdAndDelete(productId);
});
exports.deleteProduct = deleteProduct;
