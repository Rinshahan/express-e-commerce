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
exports.deleteProductWishlist = exports.getProductWishlist = exports.addProductWishList = void 0;
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const wishListModel_1 = __importDefault(require("../models/wishListModel"));
const productListService_1 = require("../services/productListService");
const addProductWishList = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.body.product;
    const userId = req.params.id;
    const updatedWishList = yield (0, productListService_1.addProduct)(userId, productId, wishListModel_1.default);
    res.status(200).json({
        status: 'success',
        data: {
            updatedWishList
        }
    });
}));
exports.addProductWishList = addProductWishList;
const getProductWishlist = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const getWishList = yield (0, productListService_1.getProduct)(userId, wishListModel_1.default);
    res.status(200).json({
        status: "success",
        data: {
            getWishList
        }
    });
}));
exports.getProductWishlist = getProductWishlist;
const deleteProductWishlist = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const productId = req.body.product;
    (0, productListService_1.deleteProduct)(userId, productId, wishListModel_1.default);
    res.status(200).json({
        status: "success"
    });
}));
exports.deleteProductWishlist = deleteProductWishlist;
