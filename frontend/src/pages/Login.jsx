import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDemoLogin = (email, password) => {
    setForm({ email, password });

    setTimeout(() => {
      const mockEvent = { preventDefault: () => {} };
      handleSubmit(mockEvent, { email, password });
    }, 100);
  };

  const handleSubmit = async (e, demoCredentials = null) => {
    e.preventDefault();

    const payload = demoCredentials || form;

    try {
      const res = await api.post("/auth/login", payload);

      localStorage.setItem("token", res.data.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.data.user));

      navigate("/dashboard");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow w-96 space-y-4"
      >
        <h1 className="text-blue-600 font-bold text-xl text-center">
          StockFlow Login
        </h1>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <input
          type="email"
          className="border w-full p-2 rounded"
          name="email"
          value={form.email}
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="border w-full p-2 rounded"
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded font-medium hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="border-t pt-4 mt-2">
          <p className="text-xs text-gray-500 text-center mb-2 font-medium">
            Click a demo user to log in instantly:
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => handleDemoLogin("admin@test.com", "123456")}
              className="flex-1 text-xs bg-purple-50 text-purple-700 border border-purple-200 p-2 rounded hover:bg-purple-100 transition font-semibold"
            >
              Admin Demo
            </button>
            <button
              type="button"
              onClick={() => handleDemoLogin("shopper@test.com", "123456")}
              className="flex-1 text-xs bg-orange-50 text-orange-700 border border-orange-200 p-2 rounded hover:bg-orange-100 transition font-semibold"
            >
              Shopper Demo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
