/**
 * User API Service
 * ----------------
 * This module contains API calls related to
 * user management and statistics.
 */

import api from "./axios";

/**
 * Retrieve employee statistics.
 *
 * @returns {Promise<Object>} Total employee count
 */
export const getEmployeeCount = async () => {
  const res = await api.get("/users/stats");
  return res.data;
};

/**
 * Retrieve all users.
 *
 * @returns {Promise<Array>} List of all users
 */
export const getAllUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

/**
 * Retrieve users with employee role.
 *
 * @returns {Promise<Array>} List of employee users
 */
export const getEmployees = async () => {
  const res = await api.get("/users", {
    params: { role: "employee" },
  });
  return res.data;
};
