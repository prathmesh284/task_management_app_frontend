import { useState } from "react";
import { createTask } from "../api/task.api";

const TaskForm = ({ onTaskCreated }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    assigned_to: "",
    due_date: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      assigned_to: Number(form.assigned_to),
    };

    const newTask = await createTask(payload);
    onTaskCreated(newTask);

    setForm({
      title: "",
      description: "",
      assigned_to: "",
      due_date: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow border mb-6 space-y-4"
    >
      <h2 className="text-lg font-semibold text-center">Create Task</h2>

      <input
        name="title"
        placeholder="Task title"
        className="w-full border rounded px-3 py-2 text-sm"
        value={form.title}
        onChange={handleChange}
        required
      />

      <input
        name="description"
        placeholder="Description (optional)"
        className="w-full border rounded px-3 py-2 text-sm"
        value={form.description}
        onChange={handleChange}
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          name="assigned_to"
          placeholder="User ID"
          className="border rounded px-3 py-2 text-sm"
          value={form.assigned_to}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="due_date"
          className="border rounded px-3 py-2 text-sm"
          value={form.due_date}
          onChange={handleChange}
          required
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
      >
        Create Task
      </button>
    </form>
  );
};

export default TaskForm;
