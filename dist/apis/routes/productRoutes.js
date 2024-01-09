"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const wishListController_1 = require("../controllers/wishListController");
const productController_1 = require("../controllers/productController");
const cartController_1 = require("../controllers/cartController");
const protectRoutes_1 = require("../middlewares/protectRoutes");
const adminController_1 = require("../controllers/adminController");
const multer_1 = require("../middlewares/multer");
const productRouter = express_1.default.Router();
productRouter.route('/products')
    .post(multer_1.productImageUpload, adminController_1.createProductByAdmin)
    .get(productController_1.getProduct);
productRouter.route('/product/:id')
    .get(productController_1.getProductById)
    .put(adminController_1.updateProductById)
    .delete(adminController_1.deleteProductById);
productRouter.route('/product/category/:category')
    .get(productController_1.getProductByCategory);
productRouter.route('/:id/wishlists')
    .post(protectRoutes_1.protect, wishListController_1.addProductWishList)
    .get(protectRoutes_1.protect, wishListController_1.getProductWishlist)
    .delete(protectRoutes_1.protect, wishListController_1.deleteProductWishlist);
productRouter.route('/:id/cart')
    .post(protectRoutes_1.protect, cartController_1.addProductCart)
    .get(protectRoutes_1.protect, cartController_1.getProductCart)
    .delete(protectRoutes_1.protect, cartController_1.deleteProductCart);
exports.default = productRouter;
