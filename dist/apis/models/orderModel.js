"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    products: [
        {
            productId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: {
                type: Number,
                default: 1
            }
        }
    ],
    purchaseDate: {
        type: Date,
        default: Date.now
    },
    orderId: {
        type: String,
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    totalItems: {
        type: Number,
        required: true
    }
});
const Orders = mongoose_1.default.model('Orders', orderSchema);
exports.default = Orders;
