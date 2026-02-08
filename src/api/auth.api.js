/**
 * Authentication API Service
 * --------------------------
 * This module contains API calls related to
 * user authentication (login and registration).
 */

import api from "./axios";

/**
 * Sends login request to backend.
 *
 * @param {Object} data - User login credentials
 * @returns {Promise<Object>} Login response containing access token
 */
export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

/**
 * Sends registration request to backend.
 *
 * @param {Object} data - User registration details
 * @returns {Promise<Object>} Registration response
 */
export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};
