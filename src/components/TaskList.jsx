import { useState } from "react";
import TaskCard from "./TaskCard";
import EditTaskModal from "./EditTaskModal";
import AddCommentModal from "./AddCommentModal";
import TaskCommentDrawer from "./TaskCommentDrawer";
import { deleteTask } from "../api/task.api";

const TaskList = ({ tasks }) => {
  const [editTask, setEditTask] = useState(null);
  const [commentTask, setCommentTask] = useState(null);
  const [commentTaskId, setCommentTaskId] = useState(null);

  const handleDeleteTask = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) return;

    try {
      await deleteTask(taskId);

      // Refresh page after delete
      window.location.reload();
    } catch (err) {
      alert("Failed to delete task. Please try again.");
    }
  };

  return (
    <>
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

      {editTask && (
        <EditTaskModal
          task={editTask}
          onClose={() => setEditTask(null)}
        />
      )}

      {commentTaskId && (
        <AddCommentModal
          taskId={commentTaskId}
          onClose={() => setCommentTaskId(null)}
        />
      )}

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
