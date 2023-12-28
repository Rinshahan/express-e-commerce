"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishListController_1 = require("../controllers/wishListController");
const productController_1 = require("../controllers/productController");
const cartController_1 = require("../controllers/cartController");
const adminController_1 = require("../controllers/adminController");
const productRouter = express_1.default.Router();
productRouter.route('/products')
    .get(productController_1.getProduct);
productRouter.route('/product/:id')
    .get(productController_1.getProductById)
    .put(adminController_1.updateProductById)
    .delete(adminController_1.deleteProductById);
productRouter.route('/:id/wishlists')
    .post(wishListController_1.addProductWishList)
    .get(wishListController_1.getProductWishlist)
    .delete(wishListController_1.deleteProductWishlist);
productRouter.route('/product/category/:category')
    .get(productController_1.getProductByCategory);
productRouter.route('/:id/cart')
    .post(cartController_1.addProductCart)
    .get(cartController_1.getProductCart)
    .delete(cartController_1.deleteProductCart);
exports.default = productRouter;
