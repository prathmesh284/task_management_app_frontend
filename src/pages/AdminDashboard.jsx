import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import api from "../api/axios";

const AdminDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get("/tasks").then((res) => setTasks(res.data));
  }, []);

  const handleTaskCreated = (newTask) => {
    setTasks((prev) => [newTask, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Admin Dashboard
        </h1>

        <TaskForm onTaskCreated={handleTaskCreated} />

        <h2 className="text-lg font-semibold mb-4 ml-1">
          All Tasks
        </h2>

        <TaskList tasks={tasks} />
      </div>
    </div>
  );
};

export default AdminDashboard;
