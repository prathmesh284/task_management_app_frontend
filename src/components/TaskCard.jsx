import { FiEdit2, FiTrash2, FiMessageSquare } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import { formatDate } from "./FormatDate";

const TaskCard = ({ task, onEdit, onDelete, onComment, onShowComments }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef(null);

  // 🔹 Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpenMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closeAnd = (fn) => {
    setOpenMenu(false);
    fn && fn();
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm p-4 flex flex-col justify-between h-full relative">
      {/* TOP */}
      <div>
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800 mr-8">
            {task.title}
          </h3>

          <div className="flex gap-4">
            {/* STATUS */}
            <span
              className={`inline-block text-xs px-2 py-1 rounded ${
                task.status === "Completed"
                  ? "bg-green-100 text-green-700"
                  : task.status === "In Progress"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {task.status}
            </span>

            {/* MENU */}
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setOpenMenu((p) => !p)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiEdit2 size={16} />
              </button>

              {openMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow z-10 text-sm">
                  <button
                    onClick={() => closeAnd(() => onEdit(task))}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100"
                  >
                    <FiEdit2 /> Edit
                  </button>

                  <button
                    onClick={() => closeAnd(() => onDelete(task.id))}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 text-red-600"
                  >
                    <FiTrash2 /> Delete
                  </button>

                  <button
                    onClick={() => closeAnd(() => onComment(task))}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100"
                  >
                    <FiMessageSquare /> Comment
                  </button>

                  <button
                    onClick={() => closeAnd(() => onShowComments(task))}
                    className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100"
                  >
                    <FiMessageSquare /> Show Comments
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DESCRIPTION */}
        {task.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-3">
            {task.description}
          </p>
        )}
      </div>

      {/* FOOTER */}
      <div className="text-xs text-gray-500 flex justify-between pt-3 border-t">
        <span>{task.assigned_user_name}</span>
        <span>
          {formatDate(task.created_at)} → {formatDate(task.due_date)}
        </span>
      </div>
    </div>
  );
};

export default TaskCard;
