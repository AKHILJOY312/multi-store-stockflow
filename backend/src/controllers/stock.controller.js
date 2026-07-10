import stockService from "../services/stock.service.js";
import ApiResponse from "../utils/ApiResponse.js";

class StockController {
  async getStock(req, res, next) {
    try {
      const stock = await stockService.getStock(req.query.lowStock);

      return res.json(
        new ApiResponse(200, stock, "Stock fetched successfully"),
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new StockController();
