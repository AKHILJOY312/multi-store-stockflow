import { useEffect, useState } from "react";
import api from "../api/axios";

function AdjustStockForm({ products, stores, refresh }) {
  const [productId, setProductId] = useState("");
  const [storeId, setStoreId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length) {
      setProductId(products[0]._id);
    }

    if (stores.length) {
      setStoreId(stores[0]._id);
    }
  }, [products, stores]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || !storeId) {
      return alert("Please select a product and store.");
    }

    if (quantity === "") {
      return alert("Quantity is required.");
    }

    try {
      setLoading(true);

      await api.post("/stock/adjust", {
        productId,
        storeId,
        quantity: Number(quantity),
      });

      setQuantity("");

      await refresh();

      alert("Stock updated successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update stock.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-xl font-semibold mb-4">Adjust Stock</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Product</label>

          <select
            className="w-full border rounded p-2"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
          >
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} ({product.sku})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Store</label>

          <select
            className="w-full border rounded p-2"
            value={storeId}
            onChange={(e) => setStoreId(e.target.value)}
          >
            {stores.map((store) => (
              <option key={store._id} value={store._id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">Quantity</label>

          <input
            type="number"
            className="w-full border rounded p-2"
            placeholder="Example: 50 or -10"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <p className="text-xs text-gray-500 mt-1">
            Use a positive number to add stock and a negative number to reduce
            stock.
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-orange-600 hover:bg-orange-700 text-white rounded p-2 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Adjust Stock"}
        </button>
      </form>
    </div>
  );
}

export default AdjustStockForm;
