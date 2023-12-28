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
exports.getProductByCategory = exports.getProductById = exports.getProduct = exports.CreateProduct = void 0;
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const productService_1 = require("../services/productService");
const CreateProduct = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield (0, productService_1.createProduct)(req.body);
    res.status(200).json({
        status: "success",
        data: {
            newProduct
        }
    });
}));
exports.CreateProduct = CreateProduct;
const getProduct = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const allProducts = yield (0, productService_1.getAllProducts)();
    res.status(200).json({
        status: "success",
        data: {
            allProducts
        }
    });
}));
exports.getProduct = getProduct;
const getProductById = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productById = yield (0, productService_1.getProductByIds)(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            productById
        }
    });
}));
exports.getProductById = getProductById;
const getProductByCategory = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productCategory = yield (0, productService_1.productByCategory)(req.params.category);
    res.status(200).json({
        status: "successfull",
        data: {
            productCategory
        }
    });
}));
exports.getProductByCategory = getProductByCategory;
