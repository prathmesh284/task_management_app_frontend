import { useState } from "react";
import { createComment } from "../api/comment.api";

const AddCommentModal = ({ taskId, onClose }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createComment(taskId, comment);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded shadow space-y-4"
      >
        <h2 className="text-lg font-semibold">Add Comment</h2>

        <textarea
          className="w-full border px-3 py-2 rounded"
          rows={4}
          placeholder="Write your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        />

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCommentModal;
