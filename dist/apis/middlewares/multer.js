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
exports.productImageUpload = void 0;
const multer_1 = __importDefault(require("multer"));
const cloudinary_1 = __importDefault(require("cloudinary"));
const customError_1 = __importDefault(require("../utils/customError"));
const storage = multer_1.default.diskStorage({
    destination: 'src/apis/assets',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()} ${file.originalname}`);
    }
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }
});
const cloud = cloudinary_1.default.v2;
cloud.config({
    cloud_name: 'dkw1oegyc',
    api_key: '584718756447619',
    api_secret: 'oai-RgrgtwT9eDtTZ5aoojPga0I'
});
const productImageUpload = (req, res, next) => {
    upload.single('image')(req, res, (err) => __awaiter(void 0, void 0, void 0, function* () {
        if (err) {
            next(new customError_1.default('Not Uploaded', 401));
        }
        try {
            const result = yield cloud.uploader.upload(req.file.path, {
                folder: "products"
            });
            console.log(req.file.path);
            req.body.image = result.secure_url;
            // fs.unlink(req.file.path, (unlinker) => {
            //   if (unlinker) {
            //     console.log(`Error, deleting local file`, unlinker);
            //   }
            // })
            next();
        }
        catch (err) {
            next(new customError_1.default(`${err}`, 401));
        }
    }));
};
exports.productImageUpload = productImageUpload;
