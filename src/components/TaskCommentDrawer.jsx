/**
 * TaskCommentDrawer Component
 * ---------------------------
 * This component displays task details along with
 * all associated comments in a slide-in drawer.
 * It is primarily used for viewing comments
 * without editing or adding new ones.
 */

import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";

import api from "../api/axios";
import { formatDate } from "./FormatDate";


const TaskCommentDrawer = ({ task, onClose }) => {
  // State to store fetched comments
  const [comments, setComments] = useState([]);

  // Loading state for comments fetch
  const [loading, setLoading] = useState(true);

  /**
   * Fetch comments for the selected task
   * whenever the task changes.
   */
  useEffect(() => {
    api.get(`/tasks/${task.id}/comments`)
      .then((res) => setComments(res.data))
      .finally(() => setLoading(false));
  }, [task.id]);

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* DRAWER */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-xl flex flex-col">

        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-semibold text-lg">
            Task Details
          </h2>
          <button onClick={onClose}>
            <FiX size={20} />
          </button>
        </div>

        {/* TASK INFORMATION */}
        <div className="p-4 border-b space-y-2 text-sm">
          <p><b>Title:</b> {task.title}</p>
          <p><b>Assigned:</b> {task.assigned_user_name}</p>
          <p><b>Status:</b> {task.status}</p>
          <p><b>Due:</b> {task.due_date}</p>
        </div>

        {/* COMMENTS SECTION */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <h3 className="font-medium mb-2">
            Comments
          </h3>

          {loading ? (
            <p className="text-sm text-gray-500">
              Loading comments...
            </p>
          ) : comments.length === 0 ? (
            <p className="text-sm text-gray-500">
              No comments yet.
            </p>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="border rounded p-3 text-sm bg-gray-50"
              >
                <p className="text-gray-700">
                  {c.comment}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {c.user_name} • {formatDate(c.created_at)}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default TaskCommentDrawer;
