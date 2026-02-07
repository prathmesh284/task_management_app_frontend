import { useState } from "react";
import { updateTask } from "../api/task.api";

const TITLE_REGEX = /^[A-Za-z0-9,. ]{5,}$/;

const EditTaskModal = ({ task, onClose }) => {
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || "",
    assigned_to: task.assigned_to,
    due_date: task.due_date,
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  // 🔹 Full validation (on submit)
  const validate = () => {
    const errs = {};

    if (!TITLE_REGEX.test(form.title)) {
      errs.title =
        "Title must be at least 5 characters and contain no special symbols";
    }

    if (!form.due_date || form.due_date < today) {
      errs.due_date = "Due date cannot be before today";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // 🔹 Live validation (on change)
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      const newErrors = { ...prev };

      if (name === "title") {
        if (!TITLE_REGEX.test(value)) {
          newErrors.title =
            "Title must be at least 5 characters and contain no special symbols";
        } else {
          delete newErrors.title;
        }
      }

      if (name === "due_date") {
        if (value < today) {
          newErrors.due_date = "Due date cannot be before today";
        } else {
          delete newErrors.due_date;
        }
      }

      return newErrors;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      await updateTask(task.id, form);

      // ✅ Auto refresh after successful update
      window.location.reload();
    } catch {
      alert("Failed to update task");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white w-full max-w-md p-6 rounded shadow space-y-4"
      >
        <h2 className="text-lg font-semibold">Edit Task</h2>

        {/* TITLE */}
        <div>
          <input
            name="title"
            className="w-full border px-3 py-2 rounded"
            value={form.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-xs text-red-600 mt-1">{errors.title}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <textarea
          name="description"
          rows={3}
          className="w-full border px-3 py-2 rounded"
          value={form.description}
          onChange={handleChange}
        />

        {/* DUE DATE */}
        <div>
          <input
            type="date"
            name="due_date"
            min={today}
            className="w-full border px-3 py-2 rounded"
            value={form.due_date}
            onChange={handleChange}
          />
          {errors.due_date && (
            <p className="text-xs text-red-600 mt-1">{errors.due_date}</p>
          )}
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-2 text-sm"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded text-sm disabled:opacity-50"
          >
            {submitting ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTaskModal;
