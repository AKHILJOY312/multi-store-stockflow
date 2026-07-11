import { useEffect, useState } from "react";
import api from "../api/axios";

function TransferStockForm({ products, stores, refresh }) {
  const [productId, setProductId] = useState("");
  const [fromStore, setFromStore] = useState("");
  const [toStore, setToStore] = useState("");
  const [quantity, setQuantity] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (products.length) {
      setProductId(products[0]._id);
    }

    if (stores.length > 0) {
      setFromStore(stores[0]._id);
    }

    if (stores.length > 1) {
      setToStore(stores[1]._id);
    } else if (stores.length === 1) {
      setToStore(stores[0]._id);
    }
  }, [products, stores]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!productId || !fromStore || !toStore) {
      return alert("Please select all required fields.");
    }

    if (fromStore === toStore) {
      return alert("Source and destination stores must be different.");
    }

    if (!quantity || Number(quantity) <= 0) {
      return alert("Quantity must be greater than 0.");
    }

    try {
      setLoading(true);

      await api.post("/stock/transfer", {
        productId,
        fromStore,
        toStore,
        quantity: Number(quantity),
      });

      setQuantity("");

      await refresh();

      alert("Stock transferred successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Transfer failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-xl font-semibold mb-4">Transfer Stock</h2>

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
          <label className="block mb-1 text-sm font-medium">From Store</label>

          <select
            className="w-full border rounded p-2"
            value={fromStore}
            onChange={(e) => setFromStore(e.target.value)}
          >
            {stores.map((store) => (
              <option key={store._id} value={store._id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">To Store</label>

          <select
            className="w-full border rounded p-2"
            value={toStore}
            onChange={(e) => setToStore(e.target.value)}
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
            min="1"
            className="w-full border rounded p-2"
            placeholder="Enter quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded p-2 disabled:opacity-50"
        >
          {loading ? "Transferring..." : "Transfer Stock"}
        </button>
      </form>
    </div>
  );
}

export default TransferStockForm;
