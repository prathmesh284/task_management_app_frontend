const TaskProgress = ({ total, completed }) => {
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm mb-6">
      <h3 className="font-semibold mb-2">My Progress</h3>

      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>{completed} / {total} tasks completed</span>
        <span>{percentage}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-green-500 h-3 rounded-full transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default TaskProgress;
