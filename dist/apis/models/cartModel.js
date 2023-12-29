"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const cartSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    product: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            required: true,
            ref: 'Product'
        }
    ],
    totalPrice: {
        type: Number,
        default: 0
    }
});
const Cart = mongoose_1.default.model('Cart', cartSchema);
exports.default = Cart;
