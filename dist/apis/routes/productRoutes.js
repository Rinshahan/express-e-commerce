"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishListController_1 = require("../controllers/wishListController");
const productController_1 = require("../controllers/productController");
const productRouter = express_1.default.Router();
productRouter.route('/product').get(productController_1.getProduct);
productRouter.route('/product/:id').get(productController_1.getProductById);
productRouter.route('/:id/wishlists').post(wishListController_1.addProductWishList).get(wishListController_1.getProductWishlist).delete(wishListController_1.deleteProductWishlist);
productRouter.route('/product/category/:category').get(productController_1.getProductByCategory);
exports.default = productRouter;
