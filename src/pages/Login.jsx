/**
 * Login Page
 * ----------
 * This page handles user authentication.
 * It validates user input, performs login via API,
 * decodes the JWT token to extract role information,
 * and redirects users based on their role.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { loginUser } from "../api/auth.api";
import { useAuth } from "../context/AuthContext";


/**
 * Regex for basic email validation.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


const Login = () => {
  // Form state for login credentials
  const [form, setForm] = useState({ email: "", password: "" });

  // Error message state
  const [error, setError] = useState("");

  // Auth context actions
  const { login } = useAuth();

  // Navigation hook
  const navigate = useNavigate();

  /**
   * Decode JWT token payload.
   *
   * @param {string} token - JWT access token
   * @returns {Object|null} Decoded payload or null on failure
   */
  const decodeToken = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch {
      return null;
    }
  };

  /**
   * Validate form inputs before submission.
   *
   * @returns {boolean} True if valid, otherwise false
   */
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

  /**
   * Handle input field changes with live validation.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Live validation for email
    if (name === "email") {
      if (!EMAIL_REGEX.test(value)) {
        setError("Please enter a valid email address");
      } else {
        setError("");
      }
    }

    // Clear error when password is entered
    if (name === "password" && value.trim()) {
      setError("");
    }
  };

  /**
   * Handle form submission.
   * Performs login, decodes token, stores auth data,
   * and redirects user based on role.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      const res = await loginUser(form);
      const payload = decodeToken(res.access_token);

      if (!payload?.role) {
        setError("Invalid token received");
        return;
      }

      // Store authentication data
      login(res.access_token, payload.role);

      // Redirect based on user role
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

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded">
            {error}
          </div>
        )}

        {/* Email Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="email@example.com"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Password Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="your_password"
            value={form.password}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm"
          />
        </div>

        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Login
        </button>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-blue-600 cursor-pointer hover:underline"
          >
            Register
          </span>
        </p>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500">
          Developed By @Rsquaresoft Technologies
        </p>
      </form>
    </div>
  );
};

export default Login;
