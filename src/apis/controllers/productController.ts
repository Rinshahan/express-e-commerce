import catchAsync from "../utils/asyncErrorHandler"
import { Request, Response } from "express"
import { createProduct, getAllProducts, getProductByIds, productByCategory } from "../services/productService"
import { Products } from "../interfaces/productInterface"


const CreateProduct = catchAsync(async (req: Request, res: Response) => {
  const newProduct: Products = await createProduct(req.body)
  res.status(200).json({
    status: "success",
    data: {
      newProduct
    }
  })
})

const getProduct = catchAsync(async (req: Request, res: Response) => {
  const allProducts: Products[] = await getAllProducts()
  res.status(200).json({
    status: "success",
    data: {
      allProducts
    }
  })
})

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const productById: Products = await getProductByIds(req.params.id)
  res.status(200).json({
    status: "success",
    data: {
      productById
    }
  })
})



const getProductByCategory = catchAsync(async (req: Request, res: Response) => {
  const productCategory: Products[] = await productByCategory(req.params.category)
  res.status(200).json({
    status: "successfull",
    data: {
      productCategory
    }
  })
})




export {
  CreateProduct,
  getProduct,
  getProductById,
  getProductByCategory
}