/**
 * TaskProgress Component
 * ---------------------
 * Displays a visual progress indicator showing
 * how many tasks an employee has completed.
 */

const TaskProgress = ({ total, completed }) => {
  /**
   * Calculate completion percentage.
   * Avoid division by zero when no tasks exist.
   */
  const percentage =
    total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-white border rounded-lg p-4 shadow-sm mb-6">
      <h3 className="font-semibold mb-2">
        My Progress
      </h3>

      {/* TEXT SUMMARY */}
      <div className="flex justify-between text-sm text-gray-600 mb-1">
        <span>
          {completed} / {total} tasks completed
        </span>
        <span>
          {percentage}%
        </span>
      </div>

      {/* PROGRESS BAR */}
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
