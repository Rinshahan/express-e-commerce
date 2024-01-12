import catchAsync from "../utils/asyncErrorHandler"
import { Request, Response } from "express"
import { createProduct, getAllProducts, getProductByIds, productByCategory } from "../services/productService"


const CreateProduct = catchAsync(async (req: Request, res: Response) => {
  const newProduct: Product = await createProduct(req.body)
  res.status(200).json({
    status: "success",
    data: {
      newProduct
    }
  })
})

const getProduct = catchAsync(async (req: Request, res: Response) => {
  const allProducts: Product[] = await getAllProducts()
  res.status(200).json({
    status: "success",
    data: {
      allProducts
    }
  })
})

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const productById: Product = await getProductByIds(req.params.id)
  res.status(200).json({
    status: "success",
    data: {
      productById
    }
  })
})



const getProductByCategory = catchAsync(async (req: Request, res: Response) => {
  const productCategory: Product[] = await productByCategory(req.params.category)
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