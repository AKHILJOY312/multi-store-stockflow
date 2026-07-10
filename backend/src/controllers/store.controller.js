import storeService from "../services/store.service.js";
import ApiResponse from "../utils/ApiResponse.js";

class StoreController {
  async createStore(req, res, next) {
    try {
      const store = await storeService.createStore(req.body);

      return res
        .status(201)
        .json(new ApiResponse(201, store, "Store created successfully"));
    } catch (error) {
      next(error);
    }
  }

  async getStores(req, res, next) {
    try {
      const stores = await storeService.getStores();

      return res
        .status(200)
        .json(new ApiResponse(200, stores, "Stores fetched successfully"));
    } catch (error) {
      next(error);
    }
  }
}

export default new StoreController();
