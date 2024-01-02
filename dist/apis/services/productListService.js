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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.getProduct = exports.addProduct = void 0;
const productService_1 = require("../services/productService");
const addProduct = (userId, productId, listModel) => __awaiter(void 0, void 0, void 0, function* () {
    //check product exist
    const product = yield (0, productService_1.getProductByIds)(productId);
    if (!product) {
        throw new Error("Product Not Found");
    }
    //checking existing wishlist
    const existingCart = yield listModel.findOne({ user: userId });
    if (existingCart) {
        //checking if existing cart's product
        const existingProductInCart = existingCart.product.indexOf(productId);
        if (existingProductInCart !== -1) {
            throw new Error("Product Already Exist in Cart");
        }
        else {
            //if no existing product push the product
            existingCart.product.push(productId);
            existingCart.totalPrice += product.price;
            existingCart.save();
            return existingCart;
        }
    }
    else {
        // if no existing cart then
        const newCart = yield listModel.create({ user: userId, productId: [productId] });
        return newCart;
    }
});
exports.addProduct = addProduct;
const getProduct = (userId, listModel) => __awaiter(void 0, void 0, void 0, function* () {
    const getCart = yield listModel.findOne({ user: userId });
    if (!getCart) {
        throw new Error("No Cart Found");
    }
    else {
        if (getCart.product.length === 0) {
            throw new Error("No Products Found");
        }
        return getCart;
    }
});
exports.getProduct = getProduct;
const deleteProduct = (userId, productId, listModel) => __awaiter(void 0, void 0, void 0, function* () {
    const getCart = yield listModel.findOne({ user: userId });
    if (!getCart) {
        throw new Error(`${listModel} not found`);
    }
    else {
        const indexToIndelete = getCart.product.indexOf(productId);
        const removeProduct = getCart.product[indexToIndelete];
        getCart.product.splice(indexToIndelete, 1);
        const price = (yield (0, productService_1.getProductByIds)(removeProduct)).price;
        getCart.totalPrice -= price;
        yield getCart.save();
    }
});
exports.deleteProduct = deleteProduct;
