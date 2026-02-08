/**
 * API Client Configuration
 * ------------------------
 * This file configures a centralized Axios instance
 * for communicating with the FastAPI backend.
 */

import axios from "axios";

/**
 * Create Axios instance with base backend URL.
 */
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

/**
 * Request interceptor
 * Automatically attaches JWT access token
 * to every outgoing request if available.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
