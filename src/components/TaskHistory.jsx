import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import api from "../api/axios";

const TaskHistory = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/tasks/")
            .then((res) => setTasks(res.data))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto p-6">
                <div className="mt-10">
                    <h2 className="text-lg font-semibold mb-4">
                        Task History
                    </h2>

                    {loading ? (
                        <p className="text-sm text-gray-500">Loading tasks...</p>
                    ) : tasks.length === 0 ? (
                        <p className="text-sm text-gray-500">
                            No tasks found.
                        </p>
                    ) : (
                        <TaskList tasks={tasks} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaskHistory;
