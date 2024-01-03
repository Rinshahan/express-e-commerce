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
exports.orderAProduct = void 0;
const stripe_1 = __importDefault(require("stripe"));
const orderModel_1 = __importDefault(require("../models/orderModel"));
const stripe = new stripe_1.default(process.env.STRIPE_TEST_SECRET_KEY, {
    apiVersion: '2023-10-16'
});
function generateOrderId() {
    const timestamp = Date.now();
    const randomPart = Math.random().toString(36).substring(2, 7); // 5 random characters
    return `ORD-${timestamp}-${randomPart}`;
}
const orderAProduct = (userCart) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log();
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: userCart.totalPrice * 100, // Convert to cents
        currency: "INR",
    });
    const paymentMethodToken = "tok_visa";
    const confirmedPayment = yield stripe.paymentIntents.confirm(paymentIntent.id, { payment_method: paymentMethodToken });
    if (confirmedPayment.status === "succeeded") {
        const order = new orderModel_1.default({
            user: userCart.user,
            products: userCart.product,
            purchaseDate: Date.now(),
            orderId: generateOrderId(),
            totalPrice: userCart.totalPrice,
            totalItems: userCart.product.length,
            paymentMethod: confirmedPayment.payment_method
        });
        yield order.save();
        // 5. Update Inventory (if applicable)
        // ... Code to reduce product quantities based on cart items
        return order;
    }
    else {
        throw new Error("Payment Failed");
    }
});
exports.orderAProduct = orderAProduct;
