"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
const errorMiddleware_1 = require("./apis/middlewares/errorMiddleware");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: '../config.env' });
const port = 9000;
(0, dbConnection_1.default)();
app_1.default.use(errorMiddleware_1.errorHandler);
app_1.default.listen(port, () => {
    console.log(`Listening to ${port}`);
});
