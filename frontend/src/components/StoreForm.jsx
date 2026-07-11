import { useState } from "react";
import api from "../api/axios";

function StoreForm({ refresh }) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      return alert("Store name is required.");
    }

    try {
      setLoading(true);

      await api.post("/stores", {
        name,
      });

      setName("");

      await refresh();

      alert("Store created successfully.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create store.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-5">
      <h2 className="text-xl font-semibold mb-4">Create Store</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 text-sm font-medium">Store Name</label>

          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Kochi Store"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white rounded p-2 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Store"}
        </button>
      </form>
    </div>
  );
}

export default StoreForm;
