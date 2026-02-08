/**
 * EmployeeDashboard Page
 * ----------------------
 * This page displays tasks assigned to the logged-in employee.
 * It shows task progress, allows status updates, and provides
 * access to task-specific comments.
 */

import { useEffect, useState } from "react";

import { getMyTasks } from "../api/task.api";
import EmployeeTaskCard from "../components/EmployeeTaskCard";
import TaskProgress from "../components/TaskProgress";
import EmpTaskCommentsDrawer from "../components/EmpTaskCommentDrawer";


const EmployeeDashboard = () => {
  // State to store employee tasks
  const [tasks, setTasks] = useState([]);

  // State to track currently selected task for comments
  const [activeTask, setActiveTask] = useState(null);

  /**
   * Fetch tasks assigned to the logged-in employee
   * when the component mounts.
   */
  useEffect(() => {
    getMyTasks().then(setTasks);
  }, []);

  /**
   * Calculate number of completed tasks
   * for progress display.
   */
  const completedCount = tasks.filter(
    (t) => t.status === "Completed"
  ).length;

  /**
   * Update task status locally after a successful status change.
   *
   * @param {number} taskId - ID of the task
   * @param {string} newStatus - Updated task status
   */
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

        {/* TASK PROGRESS SUMMARY */}
        <TaskProgress
          total={tasks.length}
          completed={completedCount}
        />

        {/* TASK LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.length === 0 ? (
            <p className="text-gray-500">No tasks assigned.</p>
          ) : (
            tasks.map((task) => (
              <EmployeeTaskCard
                key={task.id}
                task={task}
                onStatusChange={handleStatusChange}
                onShowComments={setActiveTask}
              />
            ))
          )}

          {/* COMMENTS DRAWER */}
          {activeTask && (
            <EmpTaskCommentsDrawer
              task={activeTask}
              onClose={() => setActiveTask(null)}
            />
          )}
        </div>

      </div>
    </div>
  );
};

export default EmployeeDashboard;
