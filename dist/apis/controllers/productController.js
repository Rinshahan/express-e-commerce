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
const productModel_1 = __importDefault(require("../models/productModel"));
const CreateProduct = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield productModel_1.default.create(req.body);
    res.status(200).json({
        status: "success",
        data: {
            newProduct
        }
    });
}));
exports.CreateProduct = CreateProduct;
const getProduct = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield productModel_1.default.find();
    res.status(200).json({
        status: "success",
        data: {
            products
        }
    });
}));
exports.getProduct = getProduct;
const getProductById = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productById = yield productModel_1.default.findById(req.params.id);
    res.status(200).json({
        status: "success",
        data: {
            productById
        }
    });
}));
exports.getProductById = getProductById;
const getProductByCategory = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.params.category;
    const productByCategory = yield productModel_1.default.find({ category });
    if (productByCategory.length === 0) {
        throw new Error("Category is not found!!");
    }
    else {
        res.status(200).json({
            status: "successfull",
            data: {
                productByCategory
            }
        });
    }
}));
exports.getProductByCategory = getProductByCategory;
