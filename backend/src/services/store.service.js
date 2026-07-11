import Store from "../models/Store.js";

class StoreService {
  async createStore(data) {
    const store = await Store.create(data);
    return store;
  }

  async getStores() {
    return await Store.find().sort({ createdAt: -1 });
  }
}

export default new StoreService();
