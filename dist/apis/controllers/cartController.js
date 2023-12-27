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
exports.deleteProductCart = exports.getProductCart = exports.addProductCart = void 0;
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const productModel_1 = __importDefault(require("../models/productModel"));
const cartModel_1 = __importDefault(require("../models/cartModel"));
const addProductCart = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const productId = req.body.product;
    const checkProduct = yield productModel_1.default.findById(productId);
    const existCart = yield cartModel_1.default.findOne({ user: userId });
    const existProduct = yield cartModel_1.default.findOne({ user: userId, product: productId });
    if (!checkProduct) {
        throw new Error("Product not Found");
    }
    if (existCart) {
        if (existProduct) {
            throw new Error("Product Already Exist in the Cart");
        }
        else {
            existCart.product.push(productId);
            existCart.save();
            res.status(200).json({
                status: "success",
                data: {
                    existCart
                }
            });
        }
    }
    else {
        if (existProduct) {
            throw new Error("Product Already Exist in the Cart");
        }
        else {
            const newCart = yield cartModel_1.default.create({ user: userId, product: productId });
            res.status(200).json({
                status: "success",
                data: {
                    newCart
                }
            });
        }
    }
}));
exports.addProductCart = addProductCart;
const getProductCart = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const getCart = yield cartModel_1.default.findOne({ user: userId });
    if (!getCart) {
        throw new Error("No Products Found");
    }
    else {
        res.status(200).json({
            status: "success",
            data: {
                getCart
            }
        });
    }
}));
exports.getProductCart = getProductCart;
const deleteProductCart = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const productId = req.body.product;
    const getCart = yield cartModel_1.default.findOne({ user: userId });
    if (!getCart) {
        throw new Error("Cart is not found");
    }
    else {
        const indexToDelete = getCart.product.indexOf(productId);
        getCart.product.splice(indexToDelete, 1);
        yield getCart.save();
        res.status(200).json({
            status: "success"
        });
    }
}));
exports.deleteProductCart = deleteProductCart;
