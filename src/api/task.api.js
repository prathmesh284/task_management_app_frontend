/**
 * Task API Service
 * ----------------
 * This module contains API calls related to
 * task management operations.
 */

import api from "./axios";

/**
 * Retrieve tasks assigned to the currently logged-in user.
 *
 * @returns {Promise<Array>} List of user's tasks
 */
export const getMyTasks = async () => {
  const res = await api.get("/tasks/my");
  return res.data;
};

/**
 * Create a new task.
 *
 * @param {Object} data - Task creation payload
 * @returns {Promise<Object>} Newly created task
 */
export const createTask = async (data) => {
  const res = await api.post("/tasks/", data);
  return res.data;
};

/**
 * Update the status of a task.
 *
 * @param {number} taskId - ID of the task
 * @param {string} status - New task status
 * @returns {Promise<Object>} Updated task
 */
export const updateTaskStatus = async (taskId, status) => {
  const res = await api.patch(`/tasks/${taskId}/status`, { status });
  return res.data;
};

/**
 * Retrieve total task count.
 *
 * @returns {Promise<Object>} Task count data
 */
export const getCount = async () => {
  const res = await api.get("/tasks/count");
  console.log(res); // Debug logging (can be removed in production)
  return res.data;
};

/**
 * Delete a task by ID.
 *
 * @param {number} taskId - ID of the task
 * @returns {Promise<Object>} Deletion response
 */
export const deleteTask = async (taskId) => {
  const res = await api.delete(`/tasks/${taskId}`);
  return res.data;
};

/**
 * Update task details.
 *
 * @param {number} taskId - ID of the task
 * @param {Object} payload - Updated task data
 * @returns {Promise<Object>} Updated task
 */
export const updateTask = async (taskId, payload) => {
  const res = await api.put(`/tasks/${taskId}`, payload);
  return res.data;
};
