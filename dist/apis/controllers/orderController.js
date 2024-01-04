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
exports.orderProduct = void 0;
const asyncErrorHandler_1 = __importDefault(require("../utils/asyncErrorHandler"));
const orderService_1 = require("../services/orderService");
const cartModel_1 = __importDefault(require("../models/cartModel"));
const orderProduct = (0, asyncErrorHandler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const findCart = yield cartModel_1.default.findOne({ user: userId });
    const session = yield (0, orderService_1.orderAProduct)(findCart);
    if (session.status === 'complete') {
        yield cartModel_1.default.deleteOne({ id: findCart.id });
        res.status(200).json({
            status: "success",
            session: session.url
        });
    }
}));
exports.orderProduct = orderProduct;
