import api from "./axios";


// Add a comment to a task
export const createComment = async (taskId, comment) => {
  const res = await api.post(`/tasks/${taskId}/comments`, {
    comment,
  });
  return res.data;
};

// Get all comments of a task
export const getTaskComments = async (taskId) => {
  const res = await api.get(`/tasks/${taskId}/comments`);
  return res.data;
};
