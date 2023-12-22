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
const productModel_1 = __importDefault(require("../models/productModel"));
const wishListModel_1 = __importDefault(require("../models/wishListModel"));
const addProductWishList = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.body.product;
    const userId = req.params.id;
    //check product exist
    const wishlistProduct = yield productModel_1.default.findById(productId);
    //checking existing wishlist and existing product in the wishlist
    const existingWishLists = yield wishListModel_1.default.findOne({ user: userId });
    const existingProduct = yield wishListModel_1.default.findOne({ user: userId, wishListProducts: productId });
    if (!wishlistProduct) {
        throw new Error("Product not Found");
    }
    // if existing wishlist exist then push into exist product
    if (existingWishLists) {
        //checking if existing product in the wishlist if exist dont push it
        if (existingProduct) {
            throw new Error("Product Already exist");
        }
        else {
            //if no existing product then push and save
            existingWishLists.wishListProducts.push(productId);
            yield existingWishLists.save();
            res.status(200).json({
                status: "succesfull",
                data: {
                    existingWishLists
                }
            });
        }
        // if no existing wishlist then create it!!
    }
    else {
        if (existingProduct) {
            throw new Error("Product Already exist");
        }
        else {
            const newWishList = yield wishListModel_1.default.create({ user: userId, wishListProducts: [productId] });
            res.status(200).json({
                status: 'Success',
                data: {
                    newWishList
                }
            });
        }
    }
}));
exports.addProductWishList = addProductWishList;
const getProductWishlist = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const wishlistProduct = yield wishListModel_1.default.find({ user: userId });
    if (!wishlistProduct) {
        throw new Error("no products");
    }
    else {
        res.status(200).json({
            status: "success",
            data: {
                wishlistProducts: wishlistProduct
            }
        });
    }
}));
exports.getProductWishlist = getProductWishlist;
const deleteProductWishlist = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const productId = req.body.product;
    const checkWishlist = yield wishListModel_1.default.findOne({ user: userId });
    if (!checkWishlist) {
        throw new Error("Error not found");
    }
    else {
        const indexToDelete = yield checkWishlist.wishListProducts.indexOf(productId);
        console.log(indexToDelete);
        checkWishlist.wishListProducts.splice(indexToDelete, 1);
        yield checkWishlist.save();
        res.status(200).json({
            status: "success"
        });
    }
}));
exports.deleteProductWishlist = deleteProductWishlist;
