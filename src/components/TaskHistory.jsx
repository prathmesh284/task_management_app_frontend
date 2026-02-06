import { useEffect, useState } from "react";
import TaskList from "./TaskList";
import api from "../api/axios";

const FILTERS = ["all", "Pending", "In Progress", "Completed"];
const PAGE_SIZE = 9;

const TaskHistory = () => {
    const [tasks, setTasks] = useState([]);
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);

        api
            .get("/tasks/", {
                params: {
                    status,
                    page,
                    limit: PAGE_SIZE,
                },
            })
            .then((res) => {
                setTasks(res.data?.items ?? []);
                setPages(res.data?.pages ?? 1);
            })
            .catch(() => {
                setTasks([]);
                setPages(1);
            })
            .finally(() => setLoading(false));
    }, [status, page]);

    const handleFilterChange = (newStatus) => {
        setStatus(newStatus);
        setPage(1);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-7xl mx-auto p-12">
                <h2 className="text-xl font-semibold mb-6 ml-1">
                    Task History
                </h2>

                {/* 🔹 FILTERS */}
                <div className="flex gap-3 mb-6 flex-wrap">
                    {FILTERS.map((f) => (
                        <button
                            key={f}
                            onClick={() => handleFilterChange(f)}
                            className={`px-4 py-1 rounded-full text-sm border transition ${status === f
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-gray-600 hover:bg-gray-100"
                                }`}
                        >
                            {f === "all" ? "All" : f}
                        </button>
                    ))}
                </div>

                {/* 🔹 CONTENT */}
                {loading ? (
                    <p className="text-sm text-gray-500">Loading tasks...</p>
                ) : tasks.length === 0 ? (
                    <p className="text-sm text-gray-500">
                        No tasks found.
                    </p>
                ) : (
                    <>
                        {/* GRID: 3 PER ROW */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            <TaskList tasks={tasks} />
                        </div>


                        {/* 🔹 PAGINATION */}
                        <div className="flex justify-center gap-2 mt-8">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Prev
                            </button>

                            <span className="px-3 py-1 text-sm">
                                Page {page} of {pages}
                            </span>

                            <button
                                disabled={page === pages}
                                onClick={() => setPage((p) => p + 1)}
                                className="px-3 py-1 border rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TaskHistory;
