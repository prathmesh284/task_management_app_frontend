import { useState } from "react";
import { loginUser } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const decodeToken = (token) =>
    JSON.parse(atob(token.split(".")[1]));

  const validate = () => {
    if (!EMAIL_REGEX.test(form.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!form.password) {
      setError("Password is required");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      const res = await loginUser(form);
      const payload = decodeToken(res.access_token);

      login(res.access_token, payload.role);

      if (payload.role === "admin") {
        navigate("/admin");
      } else if (payload.role === "employee") {
        navigate("/employee");
      } else {
        setError("Unauthorized role");
      }
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Sign in to your account
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="email@example.com"
            className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            placeholder="your_password"
            className="w-full border rounded px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>

        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

        <p className="text-center text-xs text-gray-500">
          Developed By @Rsquaresoft Technologies
        </p>
      </form>
    </div>
  );
};

export default Login;
