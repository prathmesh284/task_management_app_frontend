import { updateTaskStatus } from "../api/task.api";
import { FiEdit2, FiMessageSquare } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";

const EmployeeTaskCard = ({ task, onStatusChange, onShowComments }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  // close menu on outside click
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleUpdate = async () => {
    let nextStatus = null;

    if (task.status === "Pending") nextStatus = "In Progress";
    else if (task.status === "In Progress") nextStatus = "Completed";

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
          className: "bg-green-600 hover:bg-green-700",
        };
      default:
        return null;
    }
  };

  const buttonConfig = getButtonConfig();

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col justify-between">
      {/* TOP */}
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800">{task.title}</h3>

          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpenMenu((p) => !p)}
              className="text-gray-500 hover:text-gray-700"
            >
              <FiEdit2 size={16} />
            </button>

            {openMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white border rounded shadow z-10 text-sm">
                <button
                  onClick={() => {
                    onShowComments(task);
                    setOpenMenu(false);
                  }}
                  className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100"
                >
                  <FiMessageSquare /> Show Comments
                </button>
              </div>
            )}
          </div>
        </div>

        {/* STATUS */}
        <span
          className={`inline-block text-xs px-2 py-1 rounded-full mb-2 ${
            task.status === "Completed"
              ? "bg-green-100 text-green-700"
              : task.status === "In Progress"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {task.status}
        </span>

        {/* DESCRIPTION */}
        {task.description && (
          <p className="text-sm text-gray-600 mb-3">
            {task.description}
          </p>
        )}
      </div>

      {/* ACTION */}
      {buttonConfig && (
        <button
          onClick={handleUpdate}
          className={`self-start text-xs px-4 py-1 text-white rounded transition ${buttonConfig.className}`}
        >
          {buttonConfig.label}
        </button>
      )}
    </div>
  );
};

export default EmployeeTaskCard;
