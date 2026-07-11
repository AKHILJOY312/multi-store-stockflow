import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import ProductForm from "../components/ProductForm";
import StoreForm from "../components/StoreForm";
import AdjustStockForm from "../components/AdjustStockForm";
import TransferStockForm from "../components/TransferStockForm";
import StockTable from "../components/StockTable";

function Dashboard() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [stock, setStock] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }

    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [productsRes, storesRes, stockRes] = await Promise.all([
        api.get("/products"),
        api.get("/stores"),
        api.get("/stock"),
      ]);

      setProducts(productsRes.data.data);
      setStores(storesRes.data.data);
      setStock(stockRes.data.data);
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        logout();
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}

      <div className="bg-blue-600 text-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">StockFlow</h1>

            <p className="mt-1">Welcome, {user?.name}</p>

            <span className="inline-block mt-2 bg-white text-blue-700 px-3 py-1 rounded text-sm font-semibold">
              {user?.role?.toUpperCase()}
            </span>
          </div>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main */}

      <div className="max-w-7xl mx-auto p-6">
        {user?.role === "admin" && (
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <ProductForm refresh={loadData} />

            <StoreForm refresh={loadData} />

            <AdjustStockForm
              products={products}
              stores={stores}
              refresh={loadData}
            />

            <TransferStockForm
              products={products}
              stores={stores}
              refresh={loadData}
            />
          </div>
        )}

        <StockTable stock={stock} />
      </div>
    </div>
  );
}

export default Dashboard;
