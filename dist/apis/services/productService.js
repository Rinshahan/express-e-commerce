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
exports.checkProductExist = exports.productByCategory = exports.getProductByIds = exports.getAllProducts = exports.createProduct = void 0;
const productModel_1 = __importDefault(require("../models/productModel"));
const createProduct = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield productModel_1.default.create(productData);
    return newProduct;
});
exports.createProduct = createProduct;
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const allProducts = yield productModel_1.default.find();
    return allProducts;
});
exports.getAllProducts = getAllProducts;
const getProductByIds = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield productModel_1.default.findById(productId);
});
exports.getProductByIds = getProductByIds;
const productByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    const productsByCategory = yield productModel_1.default.find({ category });
    if (productsByCategory.length === 0) {
        throw new Error("Category is not found!!");
    }
    else {
        return productsByCategory;
    }
});
exports.productByCategory = productByCategory;
const checkProductExist = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    const getProduct = yield productModel_1.default.findById(productId);
    if (getProduct) {
        return true;
    }
    else {
        false;
    }
});
exports.checkProductExist = checkProductExist;
