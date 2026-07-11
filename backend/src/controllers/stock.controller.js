import stockService from "../services/stock.service.js";
import ApiResponse from "../utils/ApiResponse.js";

class StockController {
  async getStock(req, res, next) {
    try {
      const stock = await stockService.getStock(req.query.lowStock);

      return res.json(
        new ApiResponse(200, "Stock fetched successfully", stock),
      );
    } catch (error) {
      next(error);
    }
  }

  async adjustStock(req, res, next) {
    try {
      const stock = await stockService.adjustStock(req.body);

      return res.json(
        new ApiResponse(200, "Stock adjusted successfully", stock),
      );
    } catch (error) {
      next(error);
    }
  }

  async transferStock(req, res, next) {
    try {
      const result = await stockService.transferStock(req.body);
      return res.json(
        new ApiResponse(200, "Stock transferred successfully", result),
      );
    } catch (error) {
      next(error);
    }
  }
}

export default new StockController();
