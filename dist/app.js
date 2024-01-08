"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const productRoutes_1 = __importDefault(require("./apis/routes/productRoutes"));
const userAuthRoutes_1 = __importDefault(require("./apis/routes/userAuthRoutes"));
const cors_1 = __importDefault(require("cors"));
const adminRoutes_1 = __importDefault(require("./apis/routes/adminRoutes"));
const orderRoutes_1 = __importDefault(require("./apis/routes/orderRoutes"));
//import { productImageUpload } from "./apis/middlewares/multer";
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
//app.use(productImageUpload)
app.use('/api/admin', productRoutes_1.default, adminRoutes_1.default);
// app.post('/upload', (req, res) => {
//   console.log(req.body);
// })
app.use('/api/users', userAuthRoutes_1.default, productRoutes_1.default, orderRoutes_1.default);
exports.default = app;
