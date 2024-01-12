import multer from "multer";
import cloudinary from "cloudinary"
import { NextFunction, Request, Response } from "express";
import CustomError from "../utils/customError";
import fs from "fs"

const storage = multer.diskStorage({
  destination: 'src/apis/assets',
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()} ${file.originalname}`)
  }
})

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }
})

const cloud = cloudinary.v2

cloud.config({
  cloud_name: 'dkw1oegyc',
  api_key: '584718756447619',
  api_secret: 'oai-RgrgtwT9eDtTZ5aoojPga0I'
})

const productImageUpload = (req: Request, res: Response, next: NextFunction) => {

  upload.single('image')(req, res, async (err) => {
    if (err) {
      console.log(err);

      next(new CustomError('Not Uploaded', 401))
    }
    try {
      const result = await cloud.uploader.upload(req.file.path, {
        folder: "products"
      })

      req.body.image = result.secure_url;
      // fs.unlink(req.file.path, (unlinker) => {
      //   if (unlinker) {
      //     console.log(`Error, deleting local file`, unlinker);
      //   }
      // })
      next()
    }
    catch (err) {
      console.log(err);

      next(new CustomError(`${err}`, 401))
    }
  })
}


export {
  productImageUpload
}