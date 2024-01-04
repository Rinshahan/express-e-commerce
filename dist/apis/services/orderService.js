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
const productModel_1 = __importDefault(require("../models/productModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const orderAProduct = (userCart) => __awaiter(void 0, void 0, void 0, function* () {
    const stripe = new stripe_1.default(process.env.STRIPE_TEST_SECRET_KEY, {
        apiVersion: '2023-10-16'
    });
    try {
        const userCartProduct = yield productModel_1.default.find({ _id: userCart.product });
        const cartUser = yield userModel_1.default.findOne(userCart.user);
        const lineItems = userCartProduct.map((product) => {
            return {
                price_data: {
                    currency: "inr",
                    product_data: {
                        name: product.title,
                        description: product.description
                    },
                    customer: userCart.user,
                    unit_amount: parseInt(product.price) * 100
                },
                quantity: 1,
            };
        });
        const customer = yield stripe.customers.create({
            name: cartUser.username,
            address: {
                line1: '123 Main St',
                city: 'Some City',
                state: 'Some State',
                postal_code: '12345',
                country: 'IN' // Provide the country code for India
            }
        });
        const session = yield stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:9000/api/users/payment/success",
            cancel_url: "http://localhost:9000/api/users/payment/cancel",
            customer: customer.id
        });
        return session;
    }
    catch (err) {
        console.log(err);
        throw new Error("Payment Failed");
    }
});
exports.orderAProduct = orderAProduct;
