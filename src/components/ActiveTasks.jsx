import TaskList from "./TaskList";

const ActiveTasks = ({ tasks }) => {
  const activeTasks = tasks.filter(
    (t) => t.status === "Pending" || t.status === "In Progress"
  );

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4 ml-1">
        Active Tasks Due In 7 Days ({tasks.length})
      </h2>

      {activeTasks.length === 0 ? (
        <p className="text-sm text-gray-500">
          No active tasks.
        </p>
      ) : (
        <TaskList tasks={activeTasks} />
      )}
    </div>
  );
};

export default ActiveTasks;
