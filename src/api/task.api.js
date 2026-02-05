import api from "./axios";

export const getMyTasks = async () => {
  const res = await api.get("/tasks/my");
  return res.data;
};

export const createTask = async (data) => {
  const res = await api.post("/tasks/", data);
  return res.data;
};
