import { useState } from "react";
import { createTask } from "../api/task.api";

const TITLE_REGEX = /^[A-Za-z0-9,. ]{5,}$/;

const TaskForm = ({ onTaskCreated }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assigned_to: "",
    due_date: "",
  });

  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};

    if (!TITLE_REGEX.test(form.title)) {
      errs.title =
        "Title must not contain special characters and be at least 5 characters";
    }

    if (!form.assigned_to || isNaN(form.assigned_to)) {
      errs.assigned_to = "Valid user ID is required";
    }

    if (!form.due_date) {
      errs.due_date = "Due date is required";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const due = new Date(form.due_date);
      if (due <= today) {
        errs.due_date = "Due date must be after today";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({});
    setSuccessMsg("");
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const payload = {
        ...form,
        assigned_to: Number(form.assigned_to),
      };

      const newTask = await createTask(payload);

      if (typeof onTaskCreated === "function") {
        onTaskCreated(newTask);
      }

      setSuccessMsg("✅ Task created successfully.");

      setForm({
        title: "",
        description: "",
        assigned_to: "",
        due_date: "",
      });

      // Auto-clear success message
      setTimeout(() => setSuccessMsg(""), 3000);
    } catch (err) {
      setErrorMsg(
        err?.response?.data?.detail ||
          "❌ Failed to create task. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="max-w-2xl mx-auto p-16">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-lg shadow border space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center">
            Assign Task To Employee
          </h2>

          {/* SUCCESS MESSAGE */}
          {successMsg && (
            <div className="bg-green-100 text-green-700 text-sm px-3 py-2 rounded">
              {successMsg}
            </div>
          )}

          {/* ERROR MESSAGE */}
          {errorMsg && (
            <div className="bg-red-100 text-red-700 text-sm px-3 py-2 rounded">
              {errorMsg}
            </div>
          )}

          <div>
            <input
              name="title"
              placeholder="Task title"
              className="w-full border rounded px-3 py-2 text-sm"
              value={form.title}
              onChange={handleChange}
            />
            {errors.title && (
              <p className="text-xs text-red-600 mt-1">
                {errors.title}
              </p>
            )}
          </div>

          <input
            name="description"
            placeholder="Description (optional)"
            className="w-full border rounded px-3 py-2 text-sm"
            value={form.description}
            onChange={handleChange}
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                name="assigned_to"
                placeholder="User ID"
                className="border rounded px-3 py-2 text-sm w-full"
                value={form.assigned_to}
                onChange={handleChange}
              />
              {errors.assigned_to && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.assigned_to}
                </p>
              )}
            </div>

            <div>
              <input
                type="date"
                name="due_date"
                className="border rounded px-3 py-2 text-sm w-full"
                value={form.due_date}
                onChange={handleChange}
              />
              {errors.due_date && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.due_date}
                </p>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm w-full disabled:opacity-50"
          >
            {submitting ? "Creating..." : "Create Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
