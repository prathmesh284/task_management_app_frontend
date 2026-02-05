const TaskCard = ({ task }) => {
  return (
    <div className="bg-white rounded-lg shadow border p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{task.title}</h3>

        <span
          className={`text-xs px-2 py-1 rounded-full ${
            task.status === "Completed"
              ? "bg-green-100 text-green-700"
              : task.status === "In Progress"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {task.status}
        </span>
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mb-3">
          {task.description}
        </p>
      )}

      <div className="text-xs text-gray-500 flex justify-between">
        <span>
          Employee: {task.assigned_user_name} (ID: {task.assigned_to})
        </span>
        <span>Due: {task.due_date}</span>
      </div>
    </div>
  );
};

export default TaskCard;
