function StockTable({ stock }) {
  return (
    <div className="bg-white rounded-lg shadow p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Inventory</h2>

        <span className="text-sm text-gray-500">
          Total Records: {stock.length}
        </span>
      </div>

      {stock.length === 0 ? (
        <div className="text-center text-gray-500 py-8">
          No inventory found.
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">Product</th>
                <th className="border p-3 text-left">SKU</th>
                <th className="border p-3 text-left">Store</th>
                <th className="border p-3 text-center">Quantity</th>
              </tr>
            </thead>

            <tbody>
              {stock.map((item) => (
                <tr key={item._id} className="hover:bg-gray-50">
                  <td className="border p-3">{item.productId?.name}</td>

                  <td className="border p-3">{item.productId?.sku}</td>

                  <td className="border p-3">{item.storeId?.name}</td>

                  <td
                    className={`border p-3 text-center font-semibold ${
                      item.quantity <= 10 ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    {item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-xs text-gray-500 mt-3">
            Quantities less than or equal to 10 are highlighted in red.
          </p>
        </div>
      )}
    </div>
  );
}

export default StockTable;
