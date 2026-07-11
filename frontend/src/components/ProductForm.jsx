import { useState } from "react";
import api from "../api/axios";

function ProductForm({ refresh }) {
  const [name, setName] = useState("");
  const [sku, setSku] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !sku.trim()) {
      return alert("All fields are required.");
    }

    try {
      setLoading(true);

      await api.post("/products", {
        name,
        sku,
      });

      setName("");
      setSku("");

      await refresh();

      alert("Product created successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-xl font-semibold mb-4">Create Product</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Product Name</label>

          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="MacBook Pro"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium">SKU</label>

          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="MBP-001"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded p-2 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;
