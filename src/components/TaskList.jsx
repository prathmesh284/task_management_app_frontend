import TaskCard from "./TaskCard";

const TaskList = ({ tasks }) => {
  if (!tasks.length) {
    return (
      <p className="text-gray-500 text-sm">
        No tasks available.
      </p>
    );
  }

  return (
    <div className="grid gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
