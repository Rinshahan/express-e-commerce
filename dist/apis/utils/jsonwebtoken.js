"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateToken = ((email) => {
    return jsonwebtoken_1.default.sign({ email }, `${process.env.SECRET_STR}`, { expiresIn: 60 * 60 * 24 });
});
exports.default = generateToken;
