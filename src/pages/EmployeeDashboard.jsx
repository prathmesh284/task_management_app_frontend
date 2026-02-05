import { useEffect, useState } from "react";
import { getMyTasks } from "../api/task.api";
import EmployeeTaskCard from "../components/EmployeeTaskCard";
import TaskProgress from "../components/TaskProgress";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getMyTasks().then(setTasks);
  }, []);

  const completedCount = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Employee Dashboard
        </h1>

        <TaskProgress
          total={tasks.length}
          completed={completedCount}
        />

        <div className="grid gap-4">
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks assigned.</p>
          ) : (
            tasks.map((task) => (
              <EmployeeTaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
