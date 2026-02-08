/**
 * Comment API Service
 * -------------------
 * This module contains API calls related to
 * task comments (create and fetch).
 */

import api from "./axios";

/**
 * Add a new comment to a task.
 *
 * @param {number} taskId - ID of the task
 * @param {string} comment - Comment text
 * @returns {Promise<Object>} Newly created comment
 */
export const createComment = async (taskId, comment) => {
  const res = await api.post(`/tasks/${taskId}/comments`, {
    comment,
  });
  return res.data;
};

/**
 * Retrieve all comments for a task.
 *
 * @param {number} taskId - ID of the task
 * @returns {Promise<Array>} List of task comments
 */
export const getTaskComments = async (taskId) => {
  const res = await api.get(`/tasks/${taskId}/comments`);
  return res.data;
};
