import { useEffect, useState } from "react";
import { getMyTasks } from "../api/task.api";

const EmployeeDashboard = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getMyTasks().then(setTasks);
  }, []);

  return (
    <div>
      <h2>My Tasks</h2>
      {tasks.map((t) => (
        <div key={t.id}>
          {t.title} – {t.status}
        </div>
      ))}
    </div>
  );
};

export default EmployeeDashboard;
