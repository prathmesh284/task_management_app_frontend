/**
 * Register Page
 * -------------
 * This page allows new users to create an account.
 * It performs client-side validation for name, email,
 * and password before submitting registration data
 * to the backend.
 */

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../api/auth.api";


/**
 * Regex for email validation.
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Regex for strong password validation.
 * Requirements:
 * - Minimum 8 characters
 * - At least one uppercase letter
 * - At least one lowercase letter
 * - At least one number
 * - At least one special character
 */
const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;


const Register = () => {
  // Form state for registration fields
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "employee"
  });

  // Error and success message states
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Navigation hook
  const navigate = useNavigate();

  /**
   * Validate registration form inputs.
   *
   * @returns {boolean} True if valid, otherwise false
   */
  const validate = () => {
    if (!form.name.trim()) {
      setError("Name is required");
      return false;
    }

    if (!EMAIL_REGEX.test(form.email)) {
      setError("Invalid email address");
      return false;
    }

    if (!PASSWORD_REGEX.test(form.password)) {
      setError(
        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
      );
      return false;
    }

    return true;
  };

  /**
   * Handle input changes with live validation.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    // Name validation
    if (name === "name") {
      if (!value.trim()) {
        setError("Name is required");
      } else {
        setError("");
      }
    }

    // Email validation
    if (name === "email") {
      if (!EMAIL_REGEX.test(value)) {
        setError("Invalid email address");
      } else {
        setError("");
      }
    }

    // Password validation
    if (name === "password") {
      if (!PASSWORD_REGEX.test(value)) {
        setError(
          "Password must be at least 8 characters, include uppercase, lowercase, number, and special character"
        );
      } else {
        setError("");
      }
    }
  };

  /**
   * Handle form submission.
   * Sends registration data to backend and
   * redirects user to login page on success.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!validate()) return;

    try {
      await registerUser(form);
      setSuccess("Account created successfully. You can now log in.");

      // Redirect to login after short delay
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(
        err?.response?.data?.detail ||
        "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-lg shadow-md p-6 space-y-5"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Create an account
        </h2>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-100 text-green-700 text-sm px-3 py-2 rounded">
            {success}
          </div>
        )}

        {/* Name Input */}
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm"
        />

        {/* Submit Button */}
        <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
          Register
        </button>

        {/* Password Hint */}
        <p className="text-xs text-gray-500">
          Password must contain uppercase, lowercase, number, and special character.
        </p>
      </form>
    </div>
  );
};

export default Register;
