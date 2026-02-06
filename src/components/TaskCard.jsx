const TaskCard = ({ task }) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col justify-between h-full">
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 mr-8">
            {task.title}
          </h3>

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
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
            {task.description}
          </p>
        )}
      </div>

      <div className="text-xs text-gray-500 flex justify-between pt-3 border-t">
        <span>
          {task.assigned_user_name}
        </span>
        <span>
          Due: {task.due_date}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
