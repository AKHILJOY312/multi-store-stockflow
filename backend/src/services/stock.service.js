import Inventory from "../models/Inventory.js";
import Product from "../models/Product.js";
import Store from "../models/Store.js";
import ApiError from "../utils/ApiError.js";

class StockService {
  async getStock(lowStock) {
    const filter = {};

    if (lowStock !== undefined) {
      filter.quantity = {
        $lte: Number(lowStock),
      };
    }

    const inventory = await Inventory.find(filter)
      .populate("productId", "name sku")
      .populate("storeId", "name")
      .sort({ createdAt: -1 });

    return inventory;
  }

  async adjustStock(data) {
    const { productId, storeId, quantity } = data;

    //Check product
    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(404, "", "Product not found");
    }

    //Check store
    const store = await Store.findById(storeId);
    if (!store) {
      throw new ApiError(404, "", "Store not Found");
    }

    //Positive Adjustment
    //  check inventory exist
    //    if exit update
    //    else create new
    if (quantity > 0) {
      let inventory = await Inventory.findOne({
        productId,
        storeId,
      });

      if (!inventory) {
        inventory = await Inventory.create({ productId, storeId, quantity });

        return inventory;
      }

      inventory = await Inventory.findByIdAndUpdate(
        inventory._id,
        { $inc: { quantity } },
        { new: true },
      );
      return inventory;
    }

    //Negative adjustment
    //  find the element greater than or equal quantity
    //  throw error if the inventory don't exit
    //  return the inventory
    const inventory = await Inventory.findOneAndUpdate(
      {
        productId,
        storeId,
        quantity: {
          $gt: Math.abs(quantity),
        },
      },
      { $inc: { quantity } },
      { new: true },
    );

    if (!inventory) {
      throw new ApiError(409, "", "Insufficient stock or inventory not found");
    }
    return inventory;
  }
}

export default new StockService();
