/**
 * TaskList Component
 * ------------------
 * Renders a list of task cards and manages all
 * task-related interactions such as:
 *  - Editing a task
 *  - Deleting a task
 *  - Adding a comment
 *  - Viewing task comments
 *
 * This component acts as a controller that coordinates
 * multiple modals and drawers.
 */

import { useState } from "react";

import TaskCard from "./TaskCard";
import EditTaskModal from "./EditTaskModal";
import AddCommentModal from "./AddCommentModal";
import TaskCommentDrawer from "./TaskCommentDrawer";
import { deleteTask } from "../api/task.api";


const TaskList = ({ tasks }) => {
  // State for editing a task
  const [editTask, setEditTask] = useState(null);

  // State for viewing comments drawer
  const [commentTask, setCommentTask] = useState(null);

  // State for adding a new comment
  const [commentTaskId, setCommentTaskId] = useState(null);

  /**
   * Handle task deletion with confirmation.
   */
  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await deleteTask(taskId);

      // Refresh page to reflect updated task list
      window.location.reload();
    } catch (err) {
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <>
      {/* TASK CARDS */}
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={setEditTask}
          onDelete={handleDeleteTask}
          onComment={(task) => setCommentTaskId(task.id)}
          onShowComments={setCommentTask}
        />
      ))}

      {/* EDIT TASK MODAL */}
      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
        />
      )}

      {/* ADD COMMENT MODAL */}
      {commentTaskId && (
        <AddCommentModal
          taskId={commentTaskId}
          onClose={() => setCommentTaskId(null)}
        />
      )}

      {/* VIEW COMMENTS DRAWER */}
      {commentTask && (
        <TaskCommentDrawer
          task={commentTask}
          onClose={() => setCommentTask(null)}
        />
      )}
    </>
  );
};

export default TaskList;
