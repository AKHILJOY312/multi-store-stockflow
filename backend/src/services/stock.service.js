import Inventory from "../models/Inventory.js";

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
}

export default new StockService();
