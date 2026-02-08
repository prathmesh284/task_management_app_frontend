/**
 * StatCard Component
 * -----------------
 * A reusable card component used to display
 * summary statistics or actions on dashboards.
 */

const StatCard = ({ title, value, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-white p-5 rounded-lg shadow border cursor-pointer hover:shadow-md transition"
    >
      <p className="text-sm text-gray-500">
        {title}
      </p>

      <h3 className="text-2xl font-bold mt-2">
        {value}
      </h3>
    </div>
  );
};

export default StatCard;
