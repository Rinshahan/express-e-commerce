"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const productRoutes_1 = __importDefault(require("./apis/routes/productRoutes"));
const userAuthRoutes_1 = __importDefault(require("./apis/routes/userAuthRoutes"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json()),
    app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
app.use('/api/users', userAuthRoutes_1.default, productRoutes_1.default);
// app.use((error: any, req: Request, res: Response, next: Function) => {
//   error.statusCode = error.statusCode || 500
//   error.status = error.status || 'error'
//   req.status(error.statusCode).json({
//     status: error.statusCode,
//     message: error.message
//   })
// })
exports.default = app;
