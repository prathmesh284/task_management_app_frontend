import { useEffect, useState } from "react";
import api from "../api/axios";
import StatCard from "../components/StatCard";
import ActiveTasks from "../components/ActiveTasks";
import { useNavigate } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { getEmployeeCount } from "../api/user.api";

const AdminDashboard = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate();
    const [totalEmployees, setTotalEmployees] = useState(0);

    useEffect(() => {
        api.get("/tasks/").then((res) => setTasks(res.data));
    }, []);

    useEffect(() => {
        getEmployeeCount().then((res) =>
            setTotalEmployees(res.total_employees)
        );
    }, []);

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="max-w-6xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Admin Dashboard
                </h1>

                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <StatCard
                        title="Total Employees"
                        value={totalEmployees}
                        onClick={() => navigate("/admin/users")}
                    />

                    <StatCard
                        title="Assign New Task"
                        value={<FiPlus size={28} />}
                        onClick={() => navigate("/admin/add-task")}
                    />

                    <StatCard
                        title="Total Tasks"
                        value={tasks.length}
                        onClick={() => navigate("/admin/all-tasks")}
                    />
                </div>

                {/* ACTIVE TASKS */}
                <ActiveTasks tasks={tasks} />

            </div>
        </div>
    );
};

export default AdminDashboard;
