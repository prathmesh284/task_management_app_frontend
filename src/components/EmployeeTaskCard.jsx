import { updateTaskStatus } from "../api/task.api";

const EmployeeTaskCard = ({ task, onStatusChange }) => {
  const handleUpdate = async () => {
    let nextStatus = null;

    if (task.status === "Pending") {
      nextStatus = "In Progress";
    } else if (task.status === "In Progress") {
      nextStatus = "Completed";
    }

    if (!nextStatus) return;

    await updateTaskStatus(task.id, nextStatus);
    onStatusChange(task.id, nextStatus);
  };

  const getButtonConfig = () => {
    switch (task.status) {
      case "Pending":
        return {
          label: "Start",
          className: "bg-yellow-500 hover:bg-yellow-600",
        };
      case "In Progress":
        return {
          label: "Complete",
          className: "bg-green-600 hover:bg-green-200",
        };
      case "Completed":
        return {
          label: "Completed",
          className: "bg-green-600 hover:bg-green-700",
        };
      default:
        return null;
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm">
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

      {buttonConfig && (
        <button
          onClick={handleUpdate}
          className={`text-xs px-4 py-1 text-white rounded transition ${buttonConfig.className}`}
        >
          {buttonConfig.label}
        </button>
      )}
    </div>
  );
};

export default EmployeeTaskCard;
