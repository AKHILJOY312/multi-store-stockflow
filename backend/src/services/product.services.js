import Product from "../models/Product.js";
import ApiError from "../utils/ApiError.js";

class ProductService {
  async createProduct(data) {
    const { name, sku } = data;

    const product = await Product.create({
      name,
      sku,
    });

    return product;
  }

  async getProduct() {
    return await Product.find().sort({ createAt: -1 });
  }
}

export default new ProductService();
