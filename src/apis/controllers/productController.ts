import catchAsync from "../utils/asyncErrorHandler";
import product from "../models/productModel";
const CreateProduct = catchAsync(async (req, res) => {
  const newProduct = await product.create(req.body)
  res.status(200).json({
    status: "success",
    data: {
      newProduct
    }
  })
})

export {
  CreateProduct
}