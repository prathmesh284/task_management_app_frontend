import api from "./axios";

export const getEmployeeCount = async () => {
  const res = await api.get("/users/stats");
  return res.data;
};

export const getAllUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};