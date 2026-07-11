import productServices from "../services/product.services.js";
import ApiResponse from "../utils/ApiResponse.js";

class ProductController {
  async createProduct(req, res, next) {
    try {
      const product = await productServices.createProduct(req.body);

      return res
        .status(201)
        .json(new ApiResponse(201, "Product created successfully", product));
    } catch (error) {
      next(error);
    }
  }

  async getProducts(req, res, next) {
    try {
      const products = await productServices.getProduct();

      return res
        .status(200)
        .json(new ApiResponse(201, "Products fetched successfully", products));
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();
