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
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const userSchema = new mongoose_1.default.Schema({
    username: {
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
        required: [true, 'Password is Required'],
        select: false
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
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified('password')) {
            next();
        }
        this.password = yield bcryptjs_1.default.hash(this.password, 12);
        next();
    });
});
userSchema.methods.comparePasswordinDb = (password, passwordDB) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, passwordDB);
});
const user = mongoose_1.default.model('user', userSchema);
exports.default = user;
