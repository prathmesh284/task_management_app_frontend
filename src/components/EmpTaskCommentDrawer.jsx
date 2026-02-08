import { useEffect, useState } from "react";
import { getTaskComments, createComment } from "../api/comment.api";

const EmpTaskCommentsDrawer = ({ task, onClose }) => {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (task) {
      getTaskComments(task.id).then(setComments);
    }
  }, [task]);

  const handleAdd = async () => {
    if (!text.trim()) return;

    setLoading(true);
    const newComment = await createComment(task.id, text);
    setComments((prev) => [...prev, newComment]);
    setText("");
    setLoading(false);
  };

  if (!task) return null;

  return (
    <>
      {/* OVERLAY */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
      />

      {/* DRAWER */}
      <div className="fixed right-0 top-0 h-full w-[380px] bg-white z-50 shadow-lg flex flex-col">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">{task.title}</h2>
          <p className="text-sm text-gray-500">{task.description}</p>
        </div>

        {/* COMMENTS */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {comments.length === 0 ? (
            <p className="text-sm text-gray-500">No comments yet</p>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="bg-gray-100 rounded p-2 text-sm"
              >
                <p>{c.comment}</p>
                <span className="text-xs text-gray-500">
                  {new Date(c.created_at).toLocaleString()}
                </span>
              </div>
            ))
          )}
        </div>

        {/* ADD COMMENT */}
        <div className="border-t p-3 flex gap-2">
          <input
            className="flex-1 border rounded px-3 py-2 text-sm"
            placeholder="Write a comment…"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button
            disabled={loading}
            onClick={handleAdd}
            className="bg-blue-600 text-white px-4 rounded text-sm disabled:opacity-50"
          >
            Add
          </button>
        </div>
      </div>
    </>
  );
};

export default EmpTaskCommentsDrawer;
