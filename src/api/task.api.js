import api from "./axios";

export const getMyTasks = async () => {
  const res = await api.get("/tasks/my");
  return res.data;
};

export const createTask = async (data) => {
  const res = await api.post("/tasks/", data);
  return res.data;
};

export const updateTaskStatus = async (taskId, status) => {
  const res = await api.patch(`/tasks/${taskId}/status`, { status });
  return res.data;
};

export const getCount = async () => {
  const res = await api.get("/tasks/count");
  console.log(res);
  return res.data;
}