"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'Name is Required'],
    },
    email: {
        type: String,
        required: [true, 'Email is Required'],
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, 'Please Enter valid Email']
    },
    password: {
        type: String,
        unique: true,
        required: [true, 'Password is Required']
    },
    profileImage: String,
    pofileThumbImage: String,
    accountCreatedDate: {
        type: Date,
        default: new Date().toDateString()
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});
const user = mongoose_1.default.model('user', userSchema);
exports.default = user;
