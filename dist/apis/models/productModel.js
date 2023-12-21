"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: [true, 'Title is Required'],
        unique: true
    },
    description: {
        type: String,
        required: [true, 'Description is Required']
    },
    price: {
        type: Number,
        required: [true, 'Price is Required']
    },
    image: String,
    category: {
        type: String,
        required: [true, 'Category is Required']
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
const product = mongoose_1.default.model('product', productSchema);
exports.default = product;
