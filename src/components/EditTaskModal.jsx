/**
 * EditTaskModal Component
 * ----------------------
 * This component provides a modal interface for editing
 * existing task details such as title, description,
 * and due date. It performs both live and submit-time
 * validation before updating the task.
 */

import { useState } from "react";
import { updateTask } from "../api/task.api";


/**
 * Regex for validating task title.
 * Rules:
 * - Minimum 5 characters
 * - Allows alphabets, numbers, spaces, commas, and dots
 */
const TITLE_REGEX = /^[A-Za-z0-9,. ]{5,}$/;


const EditTaskModal = ({ task, onClose }) => {
  // Form state initialized with existing task data
  const [form, setForm] = useState({
    title: task.title,
    description: task.description || "",
    assigned_to: task.assigned_to,
    due_date: task.due_date,
  });

  // Validation error state
  const [errors, setErrors] = useState({});

  // Submission state to prevent duplicate requests
  const [submitting, setSubmitting] = useState(false);

  // Current date (used to restrict due date selection)
  const today = new Date().toISOString().split("T")[0];

  /**
   * Full validation executed on form submission.
   *
   * @returns {boolean} True if form is valid
   */
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

  /**
   * Live validation handler.
   * Updates form state and clears/adds validation errors
   * as the user edits fields.
   */
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

  /**
   * Handle form submission.
   * Updates task details via API and refreshes the page
   * after a successful update.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);

    try {
      await updateTask(task.id, form);

      // Refresh page to reflect updated task data
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
        <h2 className="text-lg font-semibold">
          Edit Task
        </h2>

        {/* TITLE */}
        <div>
          <input
            name="title"
            className="w-full border px-3 py-2 rounded"
            value={form.title}
            onChange={handleChange}
          />
          {errors.title && (
            <p className="text-xs text-red-600 mt-1">
              {errors.title}
            </p>
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
            <p className="text-xs text-red-600 mt-1">
              {errors.due_date}
            </p>
          )}
        </div>

        {/* ACTION BUTTONS */}
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
